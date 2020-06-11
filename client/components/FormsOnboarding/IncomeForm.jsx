import React, { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from '@material-ui/core';
import { ErrorContext, InputContext } from '../GetStarted.jsx';
import SalaryForm from './SalaryForm.jsx';
import HourlyForm from './HourlyForm.jsx';

const IncomeForm = () => {
  const errors = useContext(ErrorContext);
  const inputs = useContext(InputContext);
  return (
    <>
      <form autoComplete="off">
        {/* Radio button about whether user is paid hourly or by salary */}
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">How are you paid?</FormLabel>
          <RadioGroup
            aria-label="employee type"
            name="employeeType"
            onChange={errors.handleChange}
          >
            <FormControlLabel
              value="Salary"
              control={<Radio />}
              label="Salary"
            />
            <FormControlLabel
              value="Hourly"
              control={<Radio />}
              label="Hourly"
            />
          </RadioGroup>
        </FormControl>
        {/* Depending on whether the user is salaried or hourly, we'll ask different income questions */}
        {renderIncomeQuestions()}
        <br />
        <br />
      </form>
    </>
  );

  function renderIncomeQuestions() {
    if (inputs.employeeType === 'Salary') {
      return (
        <ErrorContext.Provider
          value={{ ...errors, handleChange: errors.handleChange }}
        >
          <SalaryForm />
        </ErrorContext.Provider>
      );
    } else if (inputs.employeeType === 'Hourly') {
      return (
        <ErrorContext.Provider
          value={{ ...errors, handleChange: errors.handleChange }}
        >
          <HourlyForm />
        </ErrorContext.Provider>
      );
    }
  }
};

export default IncomeForm;
