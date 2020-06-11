import React, { useContext } from 'react';
import {
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { ErrorContext } from './../GetStarted.jsx';

const HourlyForm = () => {
  const errors = useContext(ErrorContext);
  return (
    <>
      <br />
      <br />
      <TextField
        required
        id="hourly-wage-input"
        label="Hourly wage (pre-tax)"
        // helperText="Incorrect entry."
        variant="outlined"
        name="hourlyWage"
        // prepends $ at the beginning of the input
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={errors.handleChange}
        error={errors.hasOwnProperty('hourlyWage') ? true : false}
        helperText={
          errors.hasOwnProperty('hourlyWage') ? errors['hourlyWage'] : ''
        }
      />
      <br />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup
          aria-label="Part time or full time?"
          name="ftStatus"
          onChange={errors.handleChange}
        >
          <FormControlLabel
            value="Part Time"
            control={<Radio />}
            label="Part Time"
          />
          <FormControlLabel
            value="Full Time"
            control={<Radio />}
            label="Full Time"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default HourlyForm;
