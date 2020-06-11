import React from 'react';
import CompanyChart from './CompanyChart.js';

import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function TotalCity(props) {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead className='TableHead'>
                <TableRow>
                  <TableCell>All Employees</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.aggregateList.map((row) => (
                  <TableRow key={row}>
                    <TableCell>{row.count}</TableCell>
                    <TableCell align="right">${row.avg_salary}</TableCell>
                    <TableCell align="right">${row.avg_bonus}</TableCell>
                    <TableCell align="right">${row.avg_stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <CompanyChart
          aggregateList={props.aggregateList}
          userSalary={props.userSalary}
          userAnnualBonus={props.userAnnualBonus}
          userStockOptions={props.userStockOptions}
        />
      </div>
    </React.Fragment>
  );
}

export default TotalCity;
