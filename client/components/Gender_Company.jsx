import React from "react";
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
  console.log("props in gender comparison", props);
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.genderList.forEach((row) => (
                  <TableRow key={row.gender}>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gender;
