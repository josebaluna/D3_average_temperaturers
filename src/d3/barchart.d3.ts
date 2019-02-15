import { extent } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { select, selectAll } from "d3-selection";
import { line } from "d3-shape";
import 'd3-transition';
import { minTemp, maxTemp, TempStat, malagaStats } from "./barchart.data";


const d3 = {
  select, selectAll, scaleBand, scaleLinear, line, axisBottom, axisLeft, extent, scaleTime, scaleOrdinal, schemeCategory10
};

const width = 500;
const height = 300;
const padding = 50;

// Creamos la tarjeta.
const card = select("#root")
  .append("div")
    .attr("class", "card");

// Creamos el 'lienzo' svg.
const svg = card
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);

const scaleYPos = d3.scaleLinear()
  .domain(d3.extent(malagaStats.reduce((acc, s) => acc.concat(s.values), [])))
  .range([height, 0]);

// In Domain (bars) we don't have continuous values, we have to identify the bands, like in ordinal scale
// we could return [0,1,2,3...20], we will do that wiht a map
const scaleXPos = d3
  .scaleBand<any>()
    .domain([0,1,2,3,4,5,6,7,8,9,10,11])
    .range([0, width]) // use RangeRound to get pixel perfect layout
    .paddingInner(0.1); // space between bars, wathout! percentages values, range number 0..1

const barGroup = svg
  .append('g');

barGroup
.selectAll('rect')
.data(maxTemp)
.enter()
.append("rect")
  .attr("x", (d,i) => scaleXPos(i))
  .attr("y", d => scaleYPos(d))
  .attr("width", scaleXPos.bandwidth())
  .attr("height", d => height - scaleYPos(d))
  .attr("fill", "url(#barGradient)");

const barGroupMin = svg
 .append('g');

barGroupMin
  .selectAll('rect')
  .data(minTemp)
  .enter()
  .append("rect")
  .attr("x", (d,i) => scaleXPos(i))
  .attr("y", d => scaleYPos(d))
  .attr("width", scaleXPos.bandwidth())
  .attr("height", d => height - scaleYPos(d))
  .attr("opacity", 0.8);

// OPTIONAL
// Gradient fill for the bars.
const gradient = svg
.append("defs")
  .append("linearGradient")
    .attr("id", "barGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", "0")
    .attr("y1", height)
    .attr("x2", "0")
    .attr("y2", "0");
gradient
.append("stop")
  .attr("offset", "0")
  .attr("stop-color", "blue");
gradient
.append("stop")
  .attr("offset", "20%")
  .attr("stop-color", "orange");
gradient
.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "red");


const axisGroup = svg.append("g");

// Y Axis: call axisLeft helper and pass the scale
axisGroup
  .append("g")
  .call(d3.axisLeft(scaleYPos))
  .attr('class', 'grid');

// X axis:
axisGroup
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(scaleXPos));

// text label for the x axis
  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -100)
  .attr("y", -35)
  .style("text-anchor", "end")
  .text("Temperatures");

// text lavel for the y axis
  svg.append("text")
  .style("text-anchor", "middle")
  .attr("x", 250)
  .attr("y", 340)
  .text("Months");