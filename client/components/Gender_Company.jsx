import React, { useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { UserContext } from './contexts/userContext';

function Gender({ value, view, index }) {
  const { genderList } = useContext(UserContext);
  return (
    <React.Fragment>
      <div hidden={value !== index || view === 1}>
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
                {genderList.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">
                      ${row.avg_stock_options}
                    </TableCell>
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
