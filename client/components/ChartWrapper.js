import React, { Component } from "react";
import AggregateBarChart from "./AggregateBarChart.js";

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    new AggregateBarChart(this.refs.chart);
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default ChartWrapper;
