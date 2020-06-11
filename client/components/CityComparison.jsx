import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box, AppBar } from "@material-ui/core";
import Race_City from "./Race_City.jsx";
import Age_City from "./Age_City.jsx";
import Gender_City from "./Gender_City.jsx";
import Total_City from "./Total_City.jsx";

function CompanyComparison(props) {
  const [value, setValue] = useState(0);

  const changeGraph = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div hidden={props.view !== props.index}>
        <Container>
          <div className="category_container">
            <div className="category_comparison_div">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={changeGraph}
                className="vertical_tab_bar"
              >
                <Tab label="Total"></Tab>
                <Tab label="Race"></Tab>
                <Tab label="Age"></Tab>
                <Tab label="Gender"></Tab>
              </Tabs>
            </div>
          </div>
        </Container>
  
        <Box>
          <Total_City
            allNames={props.allNames}
            userSalary={props.baseSalary}
            userAnnualBonus={props.annualBonus}
            userStockOptions={props.stockOptions}
            aggregateList={props.aggregateList}
            view={props.view}
            value={value}
            index={0}
          />
        </Box>
        <Box>
          <Race_City
            raceList={props.raceList}
            view={props.view}
            value={value}
            index={1}
          />
        </Box>
        <Box>
          <Age_City
            view={props.view}
            value={value}
            index={2}
            ageList={props.ageList}
          />
        </Box>
        <Box>
          <Gender_City
            view={props.view}
            value={value}
            index={3}
            genderList={props.genderList}
          />
        </Box>
      </div>
    </React.Fragment>
  );
}

export default CompanyComparison;
