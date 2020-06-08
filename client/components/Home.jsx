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
  const [name, setName] = useState(null);

  const [company, setCompany] = useState(null);

  // this is job title
  const [jobTitle, setJobTitle] = useState(null);
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

  const [allNames, setAllNames] = useState([]);
  const [allSexes, setAllSexes] = useState([]);
  const [allAges, setAllAges] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allYrsExperience, setAllYrsExperience] = useState([]);
  const [allYrsCompany, setAllYrsCompany] = useState([]);
  const [allBaseSalary, setAllBaseSalary] = useState([]);
  const [allAnnualBonus, setAllAnnualBonus] = useState([]);
  const [allStockOptions, setAllStockOptions] = useState([]);
  const [allSigningBonuses, setAllSigningBonuses] = useState([]);
  const [allFtStatuses, setAllFtStatuses] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [ageList, setAgeList] = useState([]);

  const employeesNames = [];
  const employeesSexuality = [];
  const employeesAge = [];
  const employeesType = [];
  const employeesYrsExperience = [];
  const employeesYrsCompany = [];
  const employeesBaseSalary = [];
  const employeesAnnualBonus = [];
  const employeesStockOptions = [];
  const employeesSigningBonus = [];
  const employeesFtStatus = [];
  const raceAvg = [];
  const genderAvg = [];
  const ageAvg = [];

  // provide company_linkedin_id, and send in body of request to get /api/company
  // need to give company name and position title
  useEffect(() => {
    // fetch call to /api/company/user_linkedin_id when you get it
    fetch("/api/company/bren-yamaguchi-56179413") /*put user_linkedin_id here */
      .then((res) => res.json())
      .then((data) => {
        // with this data, setState for each hook and prop drill to appropriate components
        console.log("data from fetch", data);
        const current = data.currentUser;

        // setting state for current logged in user
        setName(current.name);
        setCompany(current.linkedin_id);
        setJobTitle(current.job_title);
        setSexuality(current.sexuality);
        setAge(current.age);
        setGender(current.gender);
        setRace(current.race);
        setEmployeeType(current.employee_type);
        setYrsExperience(current.years_of_experience);
        setYrsCompany(current.years_at_company);
        setBaseSalary(current.base_salary);
        setAnnualBonus(current.annual_bonus);
        setStockOptions(current.stock_options);
        setSigningBonus(current.signing_bonus);
        setFtStatus(current.full_time_status);

        //grabbing race averages
        const raceList = data.raceStats;
        raceList.forEach((race) => {
          raceAvg.push({
            race: race.race,
            avg_bonus: race.avg_bonus,
            avg_salary: race.avg_salary,
            avg_stock: race.avg_stock_options,
          });
        });
        setRaceList(raceAvg);

        // grabbing gender averages
        const genderList = data.genderStats;
        genderList.forEach((gender) => {
          genderAvg.push({
            gender: gender.gender,
            avg_bonus: gender.avg_bonus,
            avg_salary: gender.avg_salary,
            avg_stock: gender.avg_stock_options,
          });
        });
        setGenderList(genderAvg);

        //grabbing age averages
        const ageList = data.ageStats;
        ageList.forEach((age) => {
          ageAvg.push({
            age: age.age,
            avg_salary: age.avg_salary,
            avg_bonus: age.avg_bonus,
            avg_stock: age.avg_stock_options,
          });
        });
        setAgeList(ageAvg);

        // setting state for individual comparisons
        const list = data.companyData;
        list.forEach((employee) => {
          employeesNames.push(employee.name);
          employeesAge.push(employee.age);
          employeesSexuality.push(employee.sexuality);
          employeesType.push(employee.employee_type);
          employeesYrsExperience.push(employee.years_of_experience);
          employeesYrsCompany.push(employee.years_at_company);
          employeesBaseSalary.push(employee.base_salary);
          employeesAnnualBonus.push(employee.annual_bonus);
          employeesStockOptions.push(employee.stock_options);
          employeesSigningBonus.push(employee.signing_bonus);
          employeesFtStatus.push(employee.full_time_status);
        });
        setAllNames(employeesNames);
        setAllAges(employeesAge);
        setAllSexes(employeesSexuality);
        setAllTypes(employeesType);
        setAllYrsExperience(employeesYrsExperience);
        setAllYrsCompany(employeesYrsCompany);
        setAllBaseSalary(employeesBaseSalary);
        setAllFtStatuses(employeesFtStatus);
      });
  }, []);

  return (
    <React.Fragment>
      <Container id="comparison_tabs">
        <AppBar id="company_individual_toggle" position="static">
          <Tabs view={view} onChange={handleComparison} centered>
            <Tab label="Company Wide Comparison" />
            <Tab label="Individual Comparison" />
          </Tabs>
        </AppBar>
      </Container>
      <div>
        <h2>Hello {name}</h2>
        <label>
          {jobTitle} at {company}
        </label>
      </div>
      <Container>
        <CompanyComparison
          view={view}
          index={0}
          name={name}
          company={company}
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
          raceList={raceList}
          genderList={genderList}
          ageList={ageList}
        />
        <IndividualComparison
          view={view}
          index={1}
          name={name}
          company={company}
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
          allNames={allNames}
          allAges={allAges}
          allSexes={allSexes}
          allTypes={allTypes}
          allYrsExperience={allYrsExperience}
          allYrsCompany={allYrsCompany}
          allBaseSalary={allBaseSalary}
        />
      </Container>
    </React.Fragment>
  );
}

export default Home;
