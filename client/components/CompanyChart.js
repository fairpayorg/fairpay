
import React, { Component, useRef } from 'react';
import * as d3 from 'd3';

class CompanyChart extends Component {
  constructor(props) {
    super(props);
    // this.createChartWrapper = this.createChartWrapper.bind(this);
    // const svgRef = useRef()
  }
  componentDidMount() {
    // new AggregateBarChart(refs.chart);
    // this.createChartWrapper();
    const userArray = [
      this.props.userSalary,
      this.props.userAnnualBonus,
      this.props.userStockOptions,
    ];
    let result = Object.values(this.props.aggregateList[0]).slice(0, 3);
    const totalCompanyData = [];
    for (let i = 0; i < userArray.length; i++) {
      totalCompanyData.push(result[i]);
      totalCompanyData.push(userArray[i]);
    }

    // Use 3 instead of 6 labels
    const textArray = [
      'Salary',
      `Salary`,
      'Annual Bonus',
      `Annual Bonus`,
      'Stock Options',
      `Stock Options`,
    ];

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

    // svg
    //   .append("p")
    //   .attr("x", 390)
    //   .attr("y", 20)
    //   .text("Average")
    //   .style("font-size", 14)
    //   .attr("alignment-baseline", "middle");

    // svg
    //   .append("circle")
    //   .attr("cx", 370)
    //   .attr("cy", 50)
    //   .attr("r", 8)
    //   .style("fill", "green");

    // svg
    //   .append("p")
    //   .attr("x", 390)
    //   .attr("y", 50)
    //   .text("User")
    //   .style("font-size", 14)
    //   .attr("alignment-baseline", "middle");

    // creating initial bars, then transition handles the height and widths
    svg
      .selectAll('rect')
      .data(totalCompanyData)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        if (i % 2 === 0) {
          return 'navy';
        }
        return 'green';
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
      .data(totalCompanyData)
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

    // Salary labels
    texts
      .data(totalCompanyData)
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
        return '$' + totalCompanyData[i];
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
        {/* <div ref="chart" width={500} height={500}>
          {" "}
        </div> */}
        <div ref="chart">
          {/* <h1>This is the bar chart</h1> */}
          <span className="legend_average"> </span>
          <span> Average</span>
          <span className="legend_user"> </span>
          <span> User</span>
        </div>
      </React.Fragment>
    );
  }
  // }
}

export default CompanyChart;

