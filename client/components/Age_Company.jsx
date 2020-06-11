import React from "react";
import BarChart_age from './charts/bar/BarChart_age.js';
import DoughnutChart_age from './charts/doughnut/DoughnutChart_age.js';
import LineChart_age from './charts/line/LineChart_age.js';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function Age(props) {
  const { averages } = props;
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead>
                <TableRow>
                  <TableCell>Age</TableCell>
                  <TableCell align="right">People in Company</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.ageList.map((row) => (
                  <TableRow key={row.age}>
                    <TableCell>{row.age}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <BarChart_age averages={averages}/>
            <DoughnutChart_age averages={averages}/>
            <LineChart_age averages={averages}/>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}