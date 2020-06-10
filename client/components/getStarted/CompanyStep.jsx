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

const CompanyStep = (props) => {
  return (
    <div>
      <TextField
        required
        id="company"
        key="company"
        label="Company"
        // helperText="Incorrect entry."
        variant="outlined"
        name="company"
        onChange={props.handleChange}
        error={props.errors.hasOwnProperty('company') ? true : false}
        helperText={
          props.errors.hasOwnProperty('company') ? props.errors['company'] : ''
        }
      />
      <br />
      <br />
      <TextField
        required
        id="state"
        key="state"
        label="State"
        // helperText="Incorrect entry."
        variant="outlined"
        name="state"
        onChange={props.handleChange}////////////////////
        error={props.errors.hasOwnProperty('state') ? true : false}
        helperText={props.errors.hasOwnProperty('state') ? props.errors['state'] : ''}
      />
      <br />
      <br />
      <Button
        // {inputs.keys.length > 0 ? disabled : color="primary"}
        color="primary"
        variant="contained"
        onClick={() => props.moveToNextStep()}
        disabled={!props.currentStepComplete}//////////////////////////
      >
        Next
    </Button>
    </div>
  );
}

export default CompanyStep;