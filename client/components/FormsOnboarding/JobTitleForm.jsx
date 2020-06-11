/* eslint-disable no-prototype-builtins */
import React, { useContext, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ErrorContext } from './../GetStarted.jsx';

const JobTitleForm = () => {
  const errors = useContext(ErrorContext);
  const [jobTitles, setJobTitles] = useState([]);
  const [didFetchJobTitles, setDidFetchJobTitles] = useState(false);
  getJobTitles();
  return (
    <>
      <TextField
        required
        id="years-experience-input"
        key="years-experience-input"
        label="# years in this industry"
        // helperText="Incorrect entry."
        variant="outlined"
        name="yearsExperience"
        onChange={errors.handleChange}
        onBlur={errors.handleChange}
        onClick={errors.handleChange}
        onFocus={errors.handleChange}
        error={errors.hasOwnProperty('yearsExperience') ? true : false}
        helperText={
          errors.hasOwnProperty('yearsExperience')
            ? errors['yearsExperience']
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
        onChange={errors.handleChange}
        onBlur={errors.handleChange}
        onClick={errors.handleChange}
        onFocus={errors.handleChange}
        error={errors.hasOwnProperty('yearsTenure') ? true : false}
        helperText={
          errors.hasOwnProperty('yearsTenure') ? errors['yearsTenure'] : ''
        }
      />
      <br />
      <br />
      <p>
        {' '}
        You will only be compared to people at your company with your same
        title.
      </p>
      <Autocomplete
        freeSolo
        id="listJobTitles"
        disableClearable
        options={jobTitles}
        getOptionLabel={(option) => option.job_title }
        renderOption={(option) =>
          <Typography>{option.job_title + ' -- (' + option.total + ') users'}</Typography>}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Enter your job title"
            margin="normal"
            variant="outlined"
            name="title"
            fullWidth
            onChange={errors.handleChange}
            onBlur={errors.handleChange}
            onClick={errors.handleChange}
            onFocus={errors.handleChange}
            error={errors.hasOwnProperty('title') ? true : false}
            helperText={errors.hasOwnProperty('title') ? errors['title'] : ''}
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </>
  );

  function getJobTitles() {
    if (didFetchJobTitles) return;
    fetch('/api/jobTitles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_name: errors.companyName,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setJobTitles(res);
        setDidFetchJobTitles(true);
      })
      .catch((error) => {
        console.error('Error fetching job titles:', error);
      });
  }
}

export default JobTitleForm;
