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

import TitleCount from '../TitleCount.jsx';

const TitleStep = (props) => {
  return (
    <div>
      <TextField
        required
        id="years-experience-input"
        key="years-experience-input"
        label="# years in this industry"
        // helperText="Incorrect entry."
        variant="outlined"
        name="yearsExperience"
        onChange={props.handleChange}//////////////
        error={props.errors.hasOwnProperty('yearsExperience') ? true : false}
        helperText={
          props.errors.hasOwnProperty('yearsExperience')
            ? props.errors['yearsExperience']
            : ''
        }
      />
      <br />
      <br />
      <TextField
        required
        id="years-tenure"
        key="years-tenure"
        label="# years at company"
        // helperText="Incorrect entry."
        variant="outlined"
        name="yearsTenure"
        onChange={props.handleChange}
        error={props.errors.hasOwnProperty('yearsTenure') ? true : false}
        helperText={
          props.errors.hasOwnProperty('yearsTenure') ? props.errors['yearsTenure'] : ''
        }
      />
      <br />
      <br />
      <p>
        {' '}
              You'll only be compared to people at your company with your SAME TITLE. Here are the titles that other employees at your company have
              used:
            </p>
      <TitleCount titles={props.titleCount} />
      <br />
      <TextField
        required
        id="title"
        label="Title"
        key="title"
        // helperText="Incorrect entry."
        variant="outlined"
        name="title"
        onChange={props.handleChange}
        error={props.errors.hasOwnProperty('title') ? true : false}
        helperText={props.errors.hasOwnProperty('title') ? props.errors['title'] : ''}
      />
      <br />
      <br />
      <Button
        // {inputs.keys.length > 0 ? disabled : color="primary"}
        disabled={!props.currentStepComplete}/////////////////
        color="primary"
        variant="contained"
        onClick={props.moveToNextStep}
      >
        Next
      </Button>
    </div>
  )
}

export default TitleStep;