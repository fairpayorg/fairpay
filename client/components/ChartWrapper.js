import React, { Component, useRef } from "react";
import AggregateBarChart from "./AggregateBarChart.js";
import * as d3 from "d3";

const ChartWrapper = (props) => {
  const svgRef = useRef();
  // constructor(props) {
  //   super(props);
  //   createChartWrapper = createChartWrapper.bind(this);
  //   // const svgRef = useRef()
  // }
  // componentDidMount() {
  //   // new AggregateBarChart(refs.chart);
  //   createChartWrapper();
  // }

  // componentDidUpdate() {
  //   createChartWrapper();
  // }

  const createChartWrapper = () => {
    // const svgRef = useRef();
    console.log("still loading     ", props.loading);
    if (!props.loading) {
      console.log("Its not loading anymore     ", props.loading);
      const chart = chart;
      // const dataMax = 800000;
      const dataMax = Math.max(
        props.aggregateList[0].avg_salary,
        props.userSalary
      );
      console.log(
        "concatted array",
        Object.values(props.aggregateList[0]).concat(props.userSalary)
      );

      const yScale = d3
        .scaleLinear()
        .domain([0, dataMax])
        .range([0, dataMax + 10]);

      d3.select(svgRef.current)
        .selectAll("rect")
        .data(Object.values(props.aggregateList[0]))
        .enter()
        .append("rect");

      d3.select(svgRef.current)
        .selectAll("rect")
        .data(Object.values(props.aggregateList[0]))
        .enter()
        .attr("x", (d, i) => i * 25)
        .attr("y", (d) => props.aggregateList[0] - yScale(d))
        .attr("height", (d) => yScale(d))
        .attr("width", 25);
    }
  };

  // render() {
  //   console.log(
  //     "props in chartWrapper",
  //     props.aggregateList[0]
  //       ? props.aggregateList[0].avg_salary
  //       : "waiting"
  //   );
  return (
    <React.Fragment>
      {props.loading ? null : (
        <React.Fragment>
          <svg ref={svgRef} width={500} height={500}>
            {" "}
          </svg>
        </React.Fragment>
      )}
    </React.Fragment>
  );
  // }
};

export default ChartWrapper;
