import React, { useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Container,
} from "@material-ui/core";
import CompanyComparison from "./CompanyComparison.jsx";
import IndividualComparison from "./IndividualComparison.jsx";
// import { useState } from "react-hooks";

const styles = {
  tab: {
    width: 50 + "%",
  },
};

function Home(props) {
  // this is the hook that toggles the different comparison views
  // defaults to company comparison view
  const [view, setView] = useState(null);
  const handleComparison = (e, view) => {
    setView(view);
  };

  // this is name of employee
  const [name, setName] = useState("saejin kang");

  // this is job title
  const [jobTitle, setJobTitle] = useState(
    "lead senior software engineer of the world"
  );
  const [sexuality, setSexuality] = useState("straight");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("male");
  const [race, setRace] = useState("asian ");
  // salary vs hourly employee
  const [employeeType, setEmployeeType] = useState("salary");
  // years of experience in field/position
  const [yrsExperience, setYrsExperience] = useState("100");
  // years at current company
  const [yrsCompany, setYrsCompany] = useState("200");
  const [baseSalary, setBaseSalary] = useState(1000000000);
  const [annualBonus, setAnnualBonus] = useState(34000000);
  // total invested and uninvested
  const [stockOptions, setStockOptions] = useState(50000);
  const [signingBonus, setSigningBonus] = useState(6000000);
  const [ftStatus, setFtStatus] = useState("full-time");

  // provide company_linkedin_id, and send in body of request to get /api/company
  // need to give company name and position title
  //   useEffect(() => {
  //     // fetch call to /api/company/user_linkedin_id when you get it
  //     fetch("/api/company")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // with this data, setState for each hook and prop drill to appropriate components
  //       });
  //   });

  return (
    <React.Fragment>
      <Container id="comparison_tabs">
        <AppBar
          //   style={styles.tab}
          id="company_individual_toggle"
          position="static"
        >
          <Tabs view={view} onChange={handleComparison} centered>
            <Tab label="Company Wide Comparison" />
            <Tab label="Individual Comparison" />
          </Tabs>
        </AppBar>
      </Container>
      <div>
        <h2>
          We'll display the user information here and consistently for every
          view (or maybe not up for discussion)
        </h2>
      </div>
      <Container>
        <CompanyComparison
          view={view}
          index={0}
          name={name}
          jobTitle={jobTitle}
          sexuality={sexuality}
          age={age}
          gender={gender}
          race={race}
          employeeType={employeeType}
          yrsExperience={yrsExperience}
          yrsCompany={yrsCompany}
          baseSalary={baseSalary}
          annualBonus={annualBonus}
          stockOptions={stockOptions}
          signingBonus={signingBonus}
          ftStatus={ftStatus}
        />
        <IndividualComparison
          view={view}
          index={1}
          name={name}
          jobTitle={jobTitle}
          sexuality={sexuality}
          age={age}
          gender={gender}
          race={race}
          employeeType={employeeType}
          yrsExperience={yrsExperience}
          yrsCompany={yrsCompany}
          baseSalary={baseSalary}
          annualBonus={annualBonus}
          stockOptions={stockOptions}
          signingBonus={signingBonus}
          ftStatus={ftStatus}
        />
      </Container>
    </React.Fragment>
  );
}

export default Home;
