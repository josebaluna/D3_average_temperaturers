export const avgTemp = [14, 13, 14, 16, 19, 25, 29, 29, 27, 21, 17, 17];
export const minTemp = [11, 10, 11, 13, 16, 21, 24, 25, 23, 17, 14, 14];
export const maxTemp = [17, 16, 17, 19, 23, 27, 31, 31, 28, 23, 19, 19];

export interface TempStat {
  id: string;
  name: string;
  values: number[];
}

export const malagaStats: TempStat[] = [
  {
    id: "avg",
    name: "Average Temp",
    values: [14, 13, 14, 16, 19, 25, 29, 29, 27, 21, 17, 17],
  },
  {
    id: "min",
    name: "Min Temp",
    values: [11, 10, 11, 13, 16, 21, 24, 25, 23, 17, 14, 14],
  },
  {
    id: "max",
    name: "Max Temp",
    values: [17, 16, 17, 19, 23, 27, 31, 31, 28, 23, 19, 19],
  }
];

// Generador de datos aleatorios en formato de array de n posiciones.
const randomArrayGenerator = n => Array.from({length: n}, () => Math.random());

// Otra forma podría ser Array(n).fill(0).map(n => Math.random());


// Singleton inicializado con datos aleatorios. Array de 20 posiciones.
export let randomData = randomArrayGenerator(12);

// Creamos un mecanismo para modifcar estos datos aleatorios cada segundo.
// Simula una fuente de datos 'real-time'. Permitimos la suscripción de un
// callback para informar a la visualización de que hubo modificaciones.
export const startRealTimeDataV1 = (onDataChange: (newData) => void) => {
  setInterval(() => {
    randomData = randomArrayGenerator(20);
    onDataChange && onDataChange(randomData);
  }, 1000);
}

export const startRealTimeDataV2 = (onDataChange: (data: any[]) => void) => {
  setInterval(() => {
    const n = Math.random() * 10 + 10;  // [10, 20]
    onDataChange && onDataChange(randomArrayGenerator(n));
  }, 1500);
}