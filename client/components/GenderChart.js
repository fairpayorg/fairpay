import React, { Component, useRef } from 'react';
import * as d3 from 'd3';

class GenderChart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const color = ['green', 'yelow', 'blue'];
    const totalGenderData = [];
    const numberOfGenders = this.props.genderList.length;
    // console.log('this is the raceList in chart     ', this.props);
    for (let i = 0; i < this.props.genderList.length; i++) {
      totalGenderData.push(this.props.genderList[i].avg_salary);
      totalGenderData.push(this.props.genderList[i].avg_bonus);
      totalGenderData.push(this.props.genderList[i].avg_stock);
    }

    const textArray = ['Salary', 'Annual Bonus', 'Stock Options'];

    const width = 1000;
    const height = 700;

    const svg = d3
      .select(this.refs.chart)
      .append('svg')
      .attr('width', width + 'px')
      .attr('height', height + 'px')
      .attr('class', 'bar');

    // making the table legend
    // svg
    //   .append("circle")
    //   .attr("cx", 370)
    //   .attr("cy", 20)
    //   .attr("r", 8)
    //   .style("fill", "navy");

    // // svg
    // //   .append("p")
    // //   .attr("x", 390)
    // //   .attr("y", 20)
    // //   .text("Average")
    // //   .style("font-size", 14)
    // //   .attr("alignment-baseline", "middle");

    // // svg
    // //   .append("circle")
    // //   .attr("cx", 370)
    // //   .attr("cy", 50)
    // //   .attr("r", 8)
    // //   .style("fill", "green");

    // // svg
    // //   .append("p")
    // //   .attr("x", 390)
    // //   .attr("y", 50)
    // //   .text("User")
    // //   .style("font-size", 14)
    // //   .attr("alignment-baseline", "middle");

    // const color = ['red', 'blue', 'green', 'yelow'];
    // creating initial bars, then transition handles the height and widths
    svg
      .selectAll('rect')
      .data(totalGenderData)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        return color[i % numberOfGenders];
      })
      .attr('class', 'sBar')
      .attr('x', (d, i) => 20 + i * 150)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 0)
      .append('title')
      .text((d) => d);

    svg
      .selectAll('rect')
      .data(totalGenderData)
      .enter()
      .append('text')
      .style('font-size', 14)
      .attr('x', (d, i) => 20 + i * 150)
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 400 - d / 1000 - 20;
        }
        return 400 - d / 90 - 20;
      })
      .text((d) => d);

    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 400 - d / 1000;
        }
        return 400 - d / 90;
      })
      .attr('height', (d, i) => {
        if (d > 1000) {
          return d / 1000;
        }
        return d / 90;
      })
      .delay(function (d, i) {
        console.log(i);
        return i * 400;
      });

    let texts = svg.selectAll('text');

    // // Salary labels
    texts
      .data(totalGenderData)
      .enter()
      .append('text')
      .attr('x', (d, i) => 10 + i * 152)
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 380 - d / 1000;
        }
        return 380 - d / 90;
      })
      .text((d, i) => {
        return '$' + totalGenderData[i];
      });
    // X labels
    texts
      .data(textArray)
      .enter()
      .append('text')
      .style('font-size', 14)
      .attr('dy', '0em')
      .attr('x', (d, i) => 20 + i * 150)
      .attr('y', (d, i) => {
        return 450;
      })
      .text((d) => d);
  }

  render() {
    return (
      <React.Fragment>
        <div ref="chart"></div>
      </React.Fragment>
    );
  }
}

export default GenderChart;
