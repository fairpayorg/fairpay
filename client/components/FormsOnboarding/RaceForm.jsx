import React, { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from '@material-ui/core';
import { ErrorContext } from './../GetStarted.jsx';

const RaceForm = () => {
  const errors = useContext(ErrorContext);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="flex-start" width={275}>
        <FormControl component="fieldset">
          <FormLabel component="legend">What race your identify with?</FormLabel>
          <RadioGroup
            aria-label="race"
            name="race"
            onChange={errors.handleChange}
          >
            <FormControlLabel value="White" control={<Radio />} label="White" />
            <FormControlLabel value="Black" control={<Radio />} label="Black" />
            <FormControlLabel value="Latino" control={<Radio />} label="Latino" />
            <FormControlLabel value="Asian" control={<Radio />} label="Asian" />
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
            onChange={errors.handleChange}
            // value={inputs.employeeType}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
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
            onChange={errors.handleChange}
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
          <RadioGroup aria-label="age" name="age" onChange={errors.handleChange}>
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
      </Box>
    </Box>
  );
};

export default RaceForm;
