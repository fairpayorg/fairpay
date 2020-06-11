import React, { useContext } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { ErrorContext } from './../GetStarted.jsx';

const SalaryForm = () => {
  const errors = useContext(ErrorContext);
  return (
    <>
      {/* Text input for annual salary*/}
      <br />
      <br />
      <TextField
        required
        error={errors.hasOwnProperty('annualIncome') ? true : false}
        helperText={
          errors.hasOwnProperty('annualIncome') ? errors['annualIncome'] : ''
        }
        id="annual-income-input"
        label="Annual Income (pre-tax)"
        variant="outlined"
        name="annualIncome"
        // prepends $ at the beginning of the input
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">$</InputAdornment>
          ),
        }}
        onChange={errors.handleChange}
      />
      <br />
      <br />
      {/* TODO: allow a N/A option for the annual bonus input */}
      <TextField
        required
        id="bonus-input"
        label="Last annual bonus"
        error={errors.hasOwnProperty('annualBonus') ? true : false}
        helperText={
          errors.hasOwnProperty('annualBonus') ? errors['annualBonus'] : ''
        }
        // helperText="Incorrect entry."
        variant="outlined"
        name="annualBonus"
        // prepends $ at the beginning of the input
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={errors.handleChange}
      />
      <br />
      <br />
      {/* TODO: allow a N/A option for the stock options input */}
      <TextField
        required
        id="stock-options-input"
        label="Total stock options "
        // helperText="Incorrect entry."
        error={errors.hasOwnProperty('stockOptions') ? true : false}
        helperText={
          errors.hasOwnProperty('stockOptions') ? errors['stockOptions'] : ''
        }
        variant="outlined"
        name="stockOptions"
        onChange={errors.handleChange}
      />
    </>
  );
}

export default SalaryForm;
