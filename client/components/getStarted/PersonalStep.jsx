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

const PersonalStep = (props) => {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          What race do you identify with?
            </FormLabel>
        <RadioGroup aria-label="race" name="race" onChange={props.handleChange}>
          <FormControlLabel
            value="White"
            control={<Radio />}
            label="White"
          />
          <FormControlLabel
            value="Black"
            control={<Radio />}
            label="Black"
          />
          <FormControlLabel
            value="Latino"
            control={<Radio />}
            label="Latino"
          />
          <FormControlLabel
            value="Asian"
            control={<Radio />}
            label="Asian"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">
          What gender do you identify with?
            </FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          onChange={props.handleChange}
        // value={inputs.employeeType}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Do you consider yourself a member of the LGBTQ community?
            </FormLabel>
        <RadioGroup
          aria-label="sexuality"
          name="sexuality"
          onChange={props.handleChange}
        // value={inputs.employeeType}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Age</FormLabel>
        <RadioGroup aria-label="age" name="age" onChange={props.handleChange}>
          <FormControlLabel
            value="18 - 35"
            control={<Radio />}
            label="18 - 35"
          />
          <FormControlLabel
            value="36 - 50"
            control={<Radio />}
            label="36 - 50"
          />
          <FormControlLabel value="51 +" control={<Radio />} label="51 +" />
        </RadioGroup>
      </FormControl>
      <br />
      <br />
      <Button
        // {...inputs.keys.length > 0 ? ' ': disabled}
        disabled={!props.currentStepComplete}
        // disabled
        color="primary"
        variant="contained"
        onClick={props.submitForm}
      >
        Complete
    </Button>
    </div>
  )
}

export default PersonalStep;