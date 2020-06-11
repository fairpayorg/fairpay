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

function Race(props) {
  const sliced = props.raceList;
  console.log(sliced);

  let slicedRaceList = [];
  for (let i = 0; i < sliced.length; i++) {
    if (i % 2 === 1) {
      slicedRaceList.push(
        <TableRow className="table-row" key={sliced[i].race}>
          <TableCell>{sliced[i].race}</TableCell>
          <TableCell align="right">{sliced[i].count}</TableCell>
          <TableCell align="right">${sliced[i].avg_salary}</TableCell>
          <TableCell align="right">${sliced[i].avg_bonus}</TableCell>
          <TableCell align="right">${sliced[i].avg_stock}</TableCell>
        </TableRow>
      );
    } else {
      slicedRaceList.push(
        <TableRow key={sliced[i].race}>
          <TableCell>{sliced[i].race}</TableCell>
          <TableCell align="right">{sliced[i].count}</TableCell>
          <TableCell align="right">${sliced[i].avg_salary}</TableCell>
          <TableCell align="right">${sliced[i].avg_bonus}</TableCell>
          <TableCell align="right">${sliced[i].avg_stock}</TableCell>
        </TableRow>
      );
    }
  }
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index}>
        <div className="data_display_div">
          <TableContainer component={Paper}>
            <Table className="table_displays">
              <TableHead className="TableHead">
                <TableRow>
                  <TableCell>Race</TableCell>

                  <TableCell align="right">People in Company</TableCell>
                  <TableCell align="right">Average Salary</TableCell>
                  <TableCell align="right">Average Annual Bonus</TableCell>
                  <TableCell align="right">Average Stock Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{slicedRaceList}</TableBody>
            </Table>
          </TableContainer>
        </div>
        <RaceChart raceList={props.raceList} />
      </div>
    </React.Fragment>
  );
}

export default Race;
