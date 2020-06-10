import React, { Component } from "react";

export default class AggregateBarChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("these are my props in wrapper:       ", this.props);
    return <div>{this.props.aggregateList}</div>;
  }
}
