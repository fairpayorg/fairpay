import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function IndividualComparison(props) {
  // need to write logic that loops through the data we get back from the fetch request and renders
  // all the employee data who work at the same company with the same title
  const { aggregate, currentUser, averages } = props;

  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index}id="individual_comparison_div">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Base Salary</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Employee Type</TableCell>
                  <TableCell align="right">LGBTQ+</TableCell>
                  <TableCell align="right">Years at Company</TableCell>
                  <TableCell align="right">Years of Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aggregate.allNames.map((key, i) => {
                  return (
                    <TableRow>
                      <TableCell>{''}</TableCell>
                      <TableCell align="right">{aggregate.allAges[i]}</TableCell>
                      <TableCell align="right">
                        ${aggregate.allBaseSalary[i]}
                      </TableCell>
                      <TableCell align="right">{aggregate.allGenders[i]}</TableCell>
                      <TableCell align="right">{aggregate.allTypes[i]}</TableCell>
                      <TableCell align="right">{aggregate.allSexes[i]}</TableCell>
                      <TableCell align="right">
                        {aggregate.allYrsCompany[i]}
                      </TableCell>
                      <TableCell align="right">
                        {aggregate.allYrsExperience[i]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default IndividualComparison;
