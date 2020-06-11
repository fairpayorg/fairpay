import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import RaceChart from './RaceChart.js';

function RaceCity(props) {
  const sliced = props.raceList;
  console.log(sliced);
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead className='TableHead'>
                <TableRow>
                  <TableCell>Race</TableCell>

                  <TableCell align="right">People in City</TableCell>
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
          </TableContainer>
        </div>
        <RaceChart raceList={props.raceList} />
      </div>
    </React.Fragment>
  );
}

export default RaceCity;
