import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function IndividualComparison({
  view,
  index,
  allNames,
  allAges,
  allBaseSalary,
  allGenders,
  allTypes,
  allSexes,
  allYrsCompany,
  allYrsExperience,
}) {
  // need to write logic that loops through the data we get back from the fetch request and renders
  // all the employee data who work at the same company with the same title

  return (
    <React.Fragment>
      <Container>
        <div hidden={view !== index} id="individual_comparison_div">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Base Salary</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Employee Type</TableCell>
                  <TableCell align="right">LGTBQ</TableCell>
                  <TableCell align="right">Years at Company</TableCell>
                  <TableCell align="right">Years of Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allNames.map((key, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{key}</TableCell>
                      <TableCell align="right">{allAges[i]}</TableCell>
                      <TableCell align="right">${allBaseSalary[i]}</TableCell>
                      <TableCell align="right">{allGenders[i]}</TableCell>
                      <TableCell align="right">{allTypes[i]}</TableCell>
                      <TableCell align="right">{allSexes[i]}</TableCell>
                      <TableCell align="right">{allYrsCompany[i]}</TableCell>
                      <TableCell align="right">{allYrsExperience[i]}</TableCell>
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
