import React, { useState, useEffect } from 'react';
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

function IndividualComparison(props) {
  // need to write logic that loops through the data we get back from the fetch request and renders
  // all the employee data who work at the same company with the same title

  const [name, setName] = useState(props.name);
  const [company, setCompany] = useState(props.company);
  const [jobTitle, setJobTitle] = useState(props.jobTitle);
  const [sexuality, setSexuality] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState();
  const [race, setRace] = useState();
  // salary vs hourly employee
  const [employeeType, setEmployeeType] = useState();
  // years of experience in field/position
  const [yrsExperience, setYrsExperience] = useState();
  // years at current company
  const [yrsCompany, setYrsCompany] = useState();
  const [baseSalary, setBaseSalary] = useState();
  const [annualBonus, setAnnualBonus] = useState();
  // total invested and uninvested
  const [stockOptions, setStockOptions] = useState();
  const [signingBonus, setSigningBonus] = useState();
  const [ftStatus, setFtStatus] = useState();

  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index} id="individual_comparison_div">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="TableHead">
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
                {props.allNames.map((key, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{key}</TableCell>
                      <TableCell align="right">{props.allAges[i]}</TableCell>
                      <TableCell align="right">
                        ${props.allBaseSalary[i]}
                      </TableCell>
                      <TableCell align="right">{props.allGenders[i]}</TableCell>
                      <TableCell align="right">{props.allTypes[i]}</TableCell>
                      <TableCell align="right">{props.allSexes[i]}</TableCell>
                      <TableCell align="right">
                        {props.allYrsCompany[i]}
                      </TableCell>
                      <TableCell align="right">
                        {props.allYrsExperience[i]}
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
