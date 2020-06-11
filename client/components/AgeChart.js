import React, { Component, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import * as d3 from 'd3';

class AgeChart extends Component {
  constructor(props) {
    super(props);
    // this.createChartWrapper = this.createChartWrapper.bind(this);
    // const svgRef = useRef()
  }

  

  componentDidMount() {
    const totalAgeData = [];

    let chartAgeList = this.props.ageList;
    const barColors = ['orange', 'yellow', 'brown'];
    let categories = ['avg_salary', 'avg_bonus', 'avg_stock'];

    for (let i = 0; i < categories.length; i++) {
      for (let j=0; j < chartAgeList.length; j++) {
        totalAgeData.push(chartAgeList[j][categories[i]]);
      }
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

    
    const numberOfRanges = chartAgeList.length;

    let barGap = 0;
   
    // creating initial bars, then transition handles the height and widths
    svg
      .selectAll('rect')
      .data(totalAgeData)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        return barColors[i % numberOfRanges];
      })
      .attr('class', 'sBar')
      .attr('x', (d, i) => {
        if (i % numberOfRanges === 0) {
          barGap += 175;
        }
        return barGap + i * 50;
      })
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 0)
      .append('title')
      .text((d) => d);

    svg
      .selectAll('rect')
      .data(totalAgeData)
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
    let salaryGap = 0;

    // Salary labels
    texts
      .data(totalAgeData)
      .enter()
      .append('text')
      .style('font-size', 12)
      .attr('x', (d, i) => {
        if (i % numberOfRanges === 0) {
          salaryGap += 175;
        }
        return salaryGap + i * 50;
      })
      .attr('y', (d, i) => {
        if (d > 1000) {
          return 380 - d / 1000;
        }
        return 380 - d / 90;
      })
      .text((d, i) => {
        return '$' + totalAgeData[i];
      });

    // X labels
    texts
      .data(textArray)
      .enter()
      .append('text')
      .style('font-size', 12)
      .attr('dy', '0em')
      .attr('x', (d, i) => 185 + i * 275)
      .attr('y', (d, i) => {
        return 435;
      })
      .text((d) => d);

      
  }


  render() {
    const ranges = ['18-35', '36-50', '51+'];
    const barColors = ['orange', 'yellow', 'brown'];
    const legendBullets = ranges.map((elem, index) => {
      return (
        <p><span className={'bullet legend-'+barColors[index]}></span>&nbsp;{ranges[index]}</p>
      )
    })
    console.log(legendBullets);
    return (
      <React.Fragment>
        
        <div ref='chart'>
          <div className='legend_box'>
            {legendBullets}
          </div>
          
        </div>
      </React.Fragment>
    );
  }
  // }
}

export default AgeChart;
