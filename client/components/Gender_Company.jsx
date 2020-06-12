import React from "react";
import BarChart_gender from './charts/bar/BarChart_gender.js';
import DoughnutChart_gender from './charts/doughnut/DoughnutChart_gender.js';
import LineChart_gender from './charts/line/LineChart_gender';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function Gender(props) {
  const { averages } = props;
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell align="right">People in Company</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.genderList.map((row) => (
                  <TableRow key={row.gender}>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <BarChart_gender averages={averages}/>
            <DoughnutChart_gender averages={averages}/>
            <LineChart_gender averages={averages}/>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gender;
