/* eslint-disable no-prototype-builtins */
import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ErrorContext } from './../GetStarted.jsx';

const CompanyForm = () => {
  const errors = useContext(ErrorContext);
  const [companies, setCompanies] = useState([]);
  const [didGetCompanies, setDidGetCompanies] = useState(false);
  getCompanies();
  console.log('error in state: ', errors['state']);
  return (
    <>
      <Autocomplete
        freeSolo
        id="listCompanyNames"
        disableClearable
        options={companies}
        getOptionLabel={(option) => option.name}
        style={{ width: 210 }}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Enter company"
            margin="normal"
            variant="outlined"
            name="company"
            fullWidth
            onChange={errors.handleChange}
            onBlur={errors.handleChange}
            onFocus={errors.handleChange}
            on={errors.handleChange}
            error={errors.hasOwnProperty('company') ? true : false}
            helperText={
              errors.hasOwnProperty('company') ? errors['company'] : ''
            }
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
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
        onClick={errors.handleChange}
        onFocus={errors.handleChange}
        onBlur={errors.handleChange}
        onChange={errors.handleChange}
        error={errors.hasOwnProperty('state') ? true : false}
        helperText={errors.hasOwnProperty('state') ? errors['state'] : ''}
      />
    </>
  );

  function getCompanies() {
    if(didGetCompanies) return;
    fetch('/api/companyNames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setCompanies(res);
        setDidGetCompanies(true);
      })
      .catch((error) => {
        console.error('Error fetching company names:', error);
      });
  }
};

export default CompanyForm;
