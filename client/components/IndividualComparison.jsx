import React, { useContext } from 'react';
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
import { UserContext } from './contexts/userContext';

const IndividualComparison = ({ view, index }) => {
  const { companyList } = useContext(UserContext);

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
                {companyList.map(
                  (
                    {
                      name,
                      age,
                      base_salary,
                      gender,
                      job_title,
                      sexuality,
                      years_at_company,
                      years_of_experience,
                    },
                    i
                  ) => (
                    <TableRow key={i}>
                      <TableCell>{name}</TableCell>
                      <TableCell align="right">{age}</TableCell>
                      <TableCell align="right">${base_salary}</TableCell>
                      <TableCell align="right">{gender}</TableCell>
                      <TableCell align="right">{job_title}</TableCell>
                      <TableCell align="right">{sexuality}</TableCell>
                      <TableCell align="right">{years_at_company}</TableCell>
                      <TableCell align="right">{years_of_experience}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default IndividualComparison;
