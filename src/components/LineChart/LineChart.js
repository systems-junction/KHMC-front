import React, { useEffect } from "react";
import * as d3 from "d3";

// import './index.css';

function LineChart(props) {
  const { data, width, height } = props;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Add logic to draw the chart here
    const margin = { top: 10, right: 10, bottom: 20, left: 20 };
    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);
    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, props.scaleWidth]);

    // const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, props.scaleHeight]);

    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // svg
    // .append('g')
    // .attr('class', 'grid')
    // .attr('transform', `translate(0,${height})`)
    // .call(
    // d3.axisBottom(xScale)
    //     .tickSize(-height)
    //     .tickFormat(''),
    // );

    svg
      .append("g")
      .attr("class", "grid")
      .style("stroke-dasharray", "4 4")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat("")
      );

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke-dasharray", "4 4")
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickSize(0)
      );

    svg
      .append("g")
      .attr("class", "y axis")
      .style("stroke-dasharray", "4 4")
      .call(
        d3
          .axisLeft()
          .scale(yScale)
          .tickSize(0)
      );

    svg
      .select(".x.axis")
      .selectAll("text")
      .style("font-size", "9px")
      .style("opacity", "70%");


      svg
      .select(".y.axis")
      .selectAll("text")
      .style("font-size", "9px")
      .style("opacity", "70%");

    //Graph Line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f26d91")
      .attr("stroke-width", 4.1)
      .attr("class", "line")
      .attr("d", line);

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus
      .append("circle")
      .attr("r", 8)
      .attr("class", "circle")
      .attr("fill", "#ffff");

    focus
      .append("circle")
      .attr("r", 4)
      .attr("class", "circle")
      .attr("fill", "#f26d91");

    let xa = focus
      .append("rect")
      .attr("width", 55)
      .attr("height", 25)
      .attr("x", -25)
      .attr("y", -40)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "#f26d91");

    focus
      .append("text")
      .attr("class", "tooltip-value")
      .attr("x", -3)
      .attr("y", -22)
      .attr("fill", "#ffff")
      .style("font-size", "15px");

    // const tooltip = d3
    //   .select("#container")
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .style("opacity", 0);

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseover", () => {
        focus.style("display", null);
      })
      .on("mouseout", () => {
        // tooltip.transition().duration(300).style("opacity", 0);
        xa.transition()
          .duration(0)
          .style("opacity", 0);
      })
      .on("mousemove", mousemove);

    function mousemove(event) {
      const bisect = d3.bisector((d) => d.label).left;
      const xPos = d3.mouse(this)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];

      if (d0) {
        xa.transition()
          .duration(300)
          .style("opacity", "100%");

        focus.select(".tooltip-value").text(d0.value);

        focus.attr(
          "transform",
          `translate(${xScale(d0.label)},${yScale(d0.value)})`
        );

        //   tooltip.transition().duration(100).style("opacity", 0.9);
        //   tooltip.html(d0.tooltipContent || d0.label);
        //   .style(
        //     "transform",
        //     `translate(${xScale(d0.label) + 30}px,${yScale(d0.value) - 30}px)`
        //   );
      }
    }
  }

  return <div id="container" />;
}

export default LineChart;
