import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Box, AppBar } from '@material-ui/core';
import Race_Company from './Race_Company.jsx';
import Age_Company from './Age_Company.jsx';
import Gender_Company from './Gender_Company.jsx';
import Total_Company from './Total_Company.jsx';

function CompanyComparison(props) {
  const [value, setValue] = useState(0);

  const changeGraph = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Container id="company_container">
        <div hidden={props.view !== props.index} id="company_comparison_div">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={changeGraph}
            className="vertical_tab_bar"
          >
            <Tab label="Aggregate"></Tab>
            <Tab label="Race"></Tab>
            <Tab label="Age"></Tab>
            <Tab label="Gender"></Tab>
          </Tabs>
        </div>
      </Container>

      <Box>
        <Total_Company
          allNames={props.allNames}
          aggregateList={props.aggregateList}
          view={props.view}
          value={value}
          index={0}
        />
      </Box>
      <Box>
        <Race_Company
          raceList={props.raceList}
          view={props.view}
          value={value}
          index={1}
        />
      </Box>
      <Box>
        <Age_Company
          view={props.view}
          value={value}
          index={2}
          ageList={props.ageList}
        />
      </Box>
      <Box>
        <Gender_Company
          view={props.view}
          value={value}
          index={3}
          genderList={props.genderList}
        />
      </Box>
    </React.Fragment>
  );
}

export default CompanyComparison;
