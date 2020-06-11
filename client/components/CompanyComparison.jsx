import React, { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  AppBar,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
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
      <div hidden={props.view !== props.index}>
        <Container>
          <div className='category_container'>
            <div className='category_comparison_div'>
              <Tabs
                orientation='vertical'
                variant='scrollable'
                value={value}
                onChange={changeGraph}
                className='vertical_tab_bar'
              >
                <Tab label='Total'></Tab>
                <Tab label='Race'></Tab>
                <Tab label='Age'></Tab>
                <Tab label='Gender'></Tab>
              </Tabs>
            </div>
          </div>
        </Container>

        <Box>
          <Total_Company
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
            userSalary={props.baseSalary}
            userAnnualBonus={props.annualBonus}
            userStockOptions={props.stockOptions}
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
      </div>
    </React.Fragment>
  );
}

export default CompanyComparison;
