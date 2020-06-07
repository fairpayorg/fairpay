import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "@material-ui/core";

function IndividualComparison(props) {
  // need to write logic that loops through the data we get back from the fetch request and renders
  // all the employee data who work at the same company with the same title
  console.log("props in individual comparison", props);
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

  //   const employeesNames = [];
  //   const employeesSexuality = [];
  //   const employeesAge = [];
  //   const employeesType = [];
  //   const employeesYrsExperience = [];
  //   const employeesYrsCompany = [];
  //   const employeesBaseSalary = [];
  //   const employeesAnnualBonus = [];
  //   const employeesStockOptions = [];
  //   const employeesSigningBonus = [];
  //   const employeesFtStatus = [];

  console.log(props.allEmployees);
  //   useEffect(() => {
  //     props.allEmployees.forEach((employee) => {
  //       employeesNames.push(employee.name);
  //       employeesAge.push(employee.age);
  //       employeesSexuality.push(employee.sexuality);
  //       employeesType.push(employee.employee_type);
  //       employeesYrsExperience.push(employee.years_of_experience);
  //       employeesYrsCompany.push(employee.years_at_company);
  //       employeesBaseSalary.push(employee.base_salary);
  //       // employeesAnnualBonus.push(employee.annual_bonus);
  //       // employeesStockOptions.push(employee.stock_options);
  //       // employeesSigningBonus.push(employee.signing_bonus);
  //       employeesFtStatus.push(employee.full_time_status);
  //     });
  //   });

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
