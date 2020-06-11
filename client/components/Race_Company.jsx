import React from "react";
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
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Race;
