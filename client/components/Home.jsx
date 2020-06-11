import React, { useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import CompanyComparison from "./CompanyComparison.jsx";
import IndividualComparison from "./IndividualComparison.jsx";

const styles = {
  tabBar: {
    backgroundColor: "#ffe082",
    color: "rgb(102, 102, 102)",
  },
};

function Home(props) {
  // this is the hook that toggles the different comparison views
  // defaults to company comparison view
  const [view, setView] = useState(0);
  const handleComparison = (e, view) => {
    setView(view);
  };

  const [currentUser, setCurrentUser] = useState({
    name: null,
    company: null,
    jobTitle: null,
    sexuality: null,
    age: null,
    gender: null,
    race: null,
    employeeType: null,
    yrsExperience: null,
    yrsCompany: null,
    baseSalary: null,
    annualBonus: null,
    stockOptions: null,
    signingBonus: null,
    ftStatus: null,
  })

  const [companyAggregate, setCompanyAggregate] = useState({
    allNames: [],
    allSexes: [],
    allGenders: [],
    allAges: [],
    allTypes: [],
    allYrsExperience: [],
    allYrsCompany: [],
    allBaseSalary: [],
    allAnnualBonus: [],
    allStockOptions: [],
    allSigningOptions: [],
    allSigningBonuses: [],
    allFtStatuses: [],

    raceList: [],
    genderList: [],
    ageList: [],
    aggregateList: [],
  });

  // state for whether fetch call is finished
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user_linkedin_id = document.cookie;
    user_linkedin_id = user_linkedin_id.split('; ').find(row => row.startsWith('userId')).split('=')[1];
    setLoading(true);

    // provide user_linkedin_id in req params
    fetch(`/api/company/${user_linkedin_id}`)
      .then((res) => res.json())
      .then((data) => {

        // with this data, setState for each hook and prop drill to appropriate components
        console.log("data from fetch", data);
        const current = data.currentUser;

        // setting state for current logged in user
        setCurrentUser({
          name: current.name,
          company: current.linkedin_id,
          jobTitle: current.job_title,
          sexuality: current.sexuality,
          age: current.age,
          gender: current.gender,
          race: current.race,
          employeeType: current.employee_type,
          yrsExperience: current.years_of_experience,
          allYrsCompany: current.years_at_company,
          baseSalary: current.base_salary,
          annualBonus: current.annual_bonus,
          stockOptions: current.stock_options,
          signingBonus: current.signing_bonus,
          ftStatus: current.full_time_status,
        })

        const newRaceList = data.raceStats.reduce((acc, curVal) => {
          acc.push({
            race: curVal.race,
            avg_bonus: curVal.avg_bonus,
            avg_salary: curVal.avg_salary,
            avg_stock: curVal.avg_stock_options,
            count: curVal.count,
          });
          return acc;
        }, []);

        const newGenderList = data.genderStats.reduce((acc, curVal) => {
          acc.push({
            gender: curVal.gender,
            avg_bonus: curVal.avg_bonus,
            avg_salary: curVal.avg_salary,
            avg_stock: curVal.avg_stock_options,
            count: curVal.count,
          });
          return acc;
        }, []);

        // setGenderList(genderAvg);

        const newAgeList = data.ageStats.reduce((acc, curVal) => {
          acc.push({
            age: curVal.age,
            avg_salary: curVal.avg_salary,
            avg_bonus: curVal.avg_bonus,
            avg_stock: curVal.avg_stock,
            count: curVal.count
          });
          return acc;
        }, []);

        const newAggregateList = data.jobStats.reduce((acc, curVal) => {
          acc.push({
            avg_salary: curVal.avg_salary,
            avg_bonus: curVal.avg_bonus,
            avg_stock: curVal.avg_stock_options,
            title: curVal.job_title,
            count: curVal.count,
          });
          return acc;
        }, []);

        // setting state for individual comparisons
        const employeesNames = [];
        const employeesAge = [];
        const employeesGender = [];
        const employeesSexuality = [];
        const employeesType = [];
        const employeesYrsExperience = [];
        const employeesYrsCompany = [];
        const employeesBaseSalary = [];
        const employeesAnnualBonus = [];
        const employeesStockOptions = [];
        const employeesSigningBonus = [];
        const employeesFtStatus = [];

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

        setCompanyAggregate({
          allNames: employeesNames,
          allAges: employeesAge,
          allGenders: employeesGender,
          allSexes: employeesSexuality,
          allTypes: employeesType,
          allYrsExperience: employeesYrsExperience,
          allYrsCompany: employeesYrsCompany,
          allBaseSalary: employeesBaseSalary,
          allAnnualBonus: employeesSigningBonus,
          allStockOptions: employeesStockOptions,
          allSigningBonuses: employeesSigningBonus,
          allFtStatuses: employeesFtStatus,

          raceList: newRaceList,
          genderList: newGenderList,
          ageList: newAgeList,
          aggregateList: newAggregateList,
        })

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
            {currentUser.jobTitle} at {currentUser.company}
          </label>
        </div>
      )}
      <Container id="comparison_tabs">
        <AppBar
          className={classes.tabBar}
          id="company_individual_toggle"
          position="static"
        >
          <Tabs value={view} onChange={handleComparison} centered>
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

                raceList={companyAggregate.raceList}
                genderList={companyAggregate.genderList}
                ageList={companyAggregate.ageList}
                aggregateList={companyAggregate.aggregateList}
                allNames={companyAggregate.allNames}
              />
              <IndividualComparison
                view={view}
                index={1}

                currentUser={currentUser}
                aggregate={companyAggregate}
              />
            </Container>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(Home);
