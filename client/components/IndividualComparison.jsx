import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "@material-ui/core";

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

  console.log("props in individual comparison", props);
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index} id="individual_comparison_div">
          {/* render the array of employees here */}
          <h2>We first display the user's information here</h2>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default IndividualComparison;
