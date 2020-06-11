import React from 'react';
import {
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
} from '@material-ui/core';

export default IncomeStep = (props) => {
  return (
    <div>
      <form autoComplete="off">
        {/* Radio button about whether user is paid hourly or by salary */}
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">How are you paid?</FormLabel>
          <RadioGroup
            aria-label="employee type"
            name="employeeType"
            onChange={() => props.handleChange()}
          >
            <FormControlLabel
              value="Salary"
              control={<Radio />}
              label="Salary"
            />
          </RadioGroup>
        </FormControl>
        {/* Depending on whether the user is salaried or hourly, we'll ask different income questiosn */}
        {() => props.renderIncomeQuestions()}
        <br />
        <br />
      </form>
      <Button
        // {inputs.keys.length > 0 ? disabled : color="primary"}
        disabled={!props.currentStepComplete}
        color="primary"
        variant="contained"
        onClick={() => props.moveToNextStep()}
      >
        Next
    </Button>
    </div>
  )
}