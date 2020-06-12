import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import BarChart_race from './charts/bar/BarChart_race.js';
import DoughnutChart_race from './charts/doughnut/DoughnutChart_race.js';
import LineChart_race from './charts/line/LineChart_race.js';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function Race(props) {
  const sliced = props.raceList;

  const d3Ref = useRef(null)
  
  useEffect(() => {

    const data = props.raceList.map((row) => {
      return {race: row.race || '', salary: row.avg_salary}
    })

    const h = 400;
    const w = 600;
    const padding = 150;

    const xScale = d3.scaleBand().range ([0, w]);
    const yScale = d3.scaleLinear().range ([h, 0]);

    let accessToD3Ref = d3.select(d3Ref.current)
    .append("svg")
    .attr("width", w + (padding * 2))
    .attr("height", h + (padding * 2))
    .style("background-color", "#ffffff")

    const g = accessToD3Ref.append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

    xScale.domain(data.map((d) => d.race));
    yScale.domain([0, d3.max(data, (d) => d.salary)]);

    g.append("g")
      .attr("transform", "translate(0," + (h) + ")")
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat((d) =>{
          return "$" + d;
      }).ticks(10))
      .append("text")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("value");

    const barWidth = xScale.bandwidth() - 120

    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.race) + (xScale.bandwidth() - barWidth) * 0.5)
    .attr("y", (d) => yScale(d.salary))
    .attr("width", barWidth)
    .attr("height", (d) => h - yScale(d.salary))
    .attr("fill", "tomato")
    
  }, [])

  // console.log(sliced);
  const { averages } = props;
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead>
                <TableRow>
                  <TableCell>Race</TableCell>
                  <TableCell align="right">People in Company</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sliced.map((row) => (
                  <TableRow key={row.race}>
                    <TableCell>{row.race}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <BarChart_race averages={averages}/>
            <DoughnutChart_race averages={averages}/>
            <LineChart_race averages={averages}/>
            <div className="d3-graph" ref={d3Ref} />
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Race;
