import React, { useState, useEffect } from 'react';
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Container,
  withStyles,
} from '@material-ui/core';
import CompanyComparison from './CompanyComparison.jsx';
import IndividualComparison from './IndividualComparison.jsx';

const styles = {
  tabBar: {
    backgroundColor: '#ffe082',
    color: 'rgb(102, 102, 102)',
  },
};
function Home(props) {
  // this is the hook that toggles the different comparison views
  // defaults to company comparison view
  const [view, setView] = useState(0);
  const handleComparison = (e, view) => {
    setView(view);
  };

  // this is name of employee
  const [name, setName] = useState(null);
  const [company, setCompany] = useState(null);

  // this is job title
  const [jobTitle, setJobTitle] = useState(null);
  // this is sexual orientation
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

  // this section is for individual comparison component
  const [allNames, setAllNames] = useState([]);
  const [allSexes, setAllSexes] = useState([]);
  const [allGenders, setAllGenders] = useState([]);
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
  const [aggregateList, setAggregateList] = useState([]);

  // state for whether fetch call is finished
  const [loading, setLoading] = useState(false);

  // used for prop drilling into child components
  const employeesNames = [];
  const employeesSexuality = [];
  const employeesGender = [];
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
  const aggregateAvg = [];

  useEffect(() => {
    let user_linkedin_id = document.cookie;
    user_linkedin_id = user_linkedin_id
      .split('; ')
      .find((row) => row.startsWith('userId'))
      .split('=')[1];
    setLoading(true);

    // provide user_linkedin_id in req params
    fetch(`/api/company/${user_linkedin_id}`)
      .then((res) => res.json())
      .then((data) => {
        // with this data, setState for each hook and prop drill to appropriate components
        console.log('data from fetch', data);
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
            count: race.count,
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
            count: gender.count,
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
            count: age.count,
          });
        });
        setAgeList(ageAvg);

        // calculating values for aggregate view
        const aggregateList = data.jobStats;
        aggregateList.forEach((item) => {
          aggregateAvg.push({
            avg_salary: item.avg_salary,
            avg_bonus: item.avg_bonus,
            avg_stock: item.avg_stock_options,
            title: item.job_title,
            count: item.count,
          });
        });
        setAggregateList(aggregateAvg);

        // setting state for individual comparisons
        const list = data.companyData;
        list.forEach((employee) => {
          employeesNames.push(employee.name);
          employeesAge.push(employee.age);
          employeesGender.push(employee.gender);
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
        setAllGenders(employeesGender);
        setAllAges(employeesAge);
        setAllSexes(employeesSexuality);
        setAllTypes(employeesType);
        setAllYrsExperience(employeesYrsExperience);
        setAllYrsCompany(employeesYrsCompany);
        setAllBaseSalary(employeesBaseSalary);
        setAllFtStatuses(employeesFtStatus);

        // after finishing this execution, set loading to false
        setLoading(false);
      });
  }, []);

  const { classes } = props;
  return (
    <React.Fragment>
      {loading ? null : (
        <div className="current_user_header">
          <h2 id="current_user_name">Hello {name}</h2>
          <label id="current_user_label">
            {jobTitle} at {company}
          </label>
        </div>
      )}
      <Container id="comparison_tabs">
        <AppBar
          className={classes.tabBar}
          id="company_individual_toggle"
          position="static"
        >
          <Tabs value={view} view={view} onChange={handleComparison} centered>
            <Tab label="Company Wide Comparison" />
            <Tab label="Individual Comparison" />
          </Tabs>
        </AppBar>
      </Container>
      {loading ? (
        <h2 className="current_user_header">Loading Data...</h2>
      ) : (
        <div>
          <div id="tables_div">
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
                aggregateList={aggregateList}
                allNames={allNames}
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
                allGenders={allGenders}
                allAges={allAges}
                allSexes={allSexes}
                allTypes={allTypes}
                allYrsExperience={allYrsExperience}
                allYrsCompany={allYrsCompany}
                allBaseSalary={allBaseSalary}
              />
            </Container>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(Home);
