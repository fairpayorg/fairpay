import React from "react";
import BarChart_title from './charts/bar/BarChart_title.js'
import DoughnutChart_title from "./charts/doughnut/DoughnutChart_title.js";
import LineChart_title from './charts/line/LineChart_title.js'
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";


function Total(props) {
  const { averages } = props;
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead className="table_head">
                <TableRow >
                  <TableCell className="MuiTableCell-root">All Employees</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="MuiTableCell-body">
                {props.aggregateList.map((row) => (
                  <TableRow>
                    <TableCell >{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <BarChart_title averages={averages}/>
            <DoughnutChart_title averages={averages}/>
            <LineChart_title averages={averages}/>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Total;
