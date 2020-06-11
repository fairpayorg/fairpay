import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PersonalForm from './FormsOnboarding/PersonalForm.jsx';
import CompanyForm from './FormsOnboarding/CompanyForm.jsx';
import JobTitleForm from './FormsOnboarding/JobTitleForm.jsx';
import IncomeForm from './FormsOnboarding/IncomeForm.jsx';

import { Box, Button, Typography } from '@material-ui/core';

export const InputContext = React.createContext({});
export const ErrorContext = React.createContext({});

function GetStarted(props) {
  const history = useHistory();
  // the "step" control defines which part of the three step flow the user is on
  const [step, setStep] = useState('intro');
  // initialize inputs as an empty object
  // every time we udpate inputs, we'll use the setInput function

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const [currentStepComplete, updateStepCompletionStatus] = useState(false);

  const steps = ['intro', 'company', 'title', 'income', 'personal', 'complete'];
  determineIfStepComplete();

  // function is called each time user clicks  'next'
  function moveToNextStep() {
    setStep(steps[steps.indexOf(step) + 1]);
  }

  // called each time an input changes
  // updates state, checks for validation errors, and updates disable status of button
  function handleChange(event) {
    const { name, value } = event.target;
    console.log('change in: ', name, value);
    setInputs({ ...inputs, [name]: value });
    handleError(name, value);
    determineIfStepComplete();
  }

  function handleError(name, value) {
    // for every change in the input, we're going to check whether that passes our validation requirements
    console.log('error name is:', name);
    let error;
    const numberFields = [
      'annualIncome',
      'annualBonus',
      'stockOptions',
      'hourlyWage',
      'yearsExperience',
      'yearsTenure',
    ];
    if (numberFields.includes(name)) {
      if (isNaN(Number(value))) {
        error = 'Please enter a number';
      }
    }

    if (error !== undefined) {
      setErrors((prevState) => ({ ...prevState, [name]: error }));
    }
    // if there is an error in the error object but the input has passed all tests, remove the error from error object
    else if (errors.hasOwnProperty(name)) {
      delete errors[name];
    }
  }

  // this function determines whether the next button is disabled
  function determineIfStepComplete() {
    let hasError = false;
    let isIncomplete = false;
    let reqQuestions;

    console.log('step is: ', step);
    // determine required questions for a given step
    if (
      step === 'income' &&
      (!inputs.employeeType || inputs.employeeType === 'Salary')
    ) {
      reqQuestions = [
        'employeeType',
        'annualIncome',
        'annualBonus',
        'stockOptions',
      ];
    } else if (
      step === 'income' &&
      (!inputs.employeeType || inputs.employeeType === 'Hourly')
    ) {
      reqQuestions = ['employeeType', 'hourlyWage', 'ftStatus'];
    } else if (step === 'title') {
      reqQuestions = ['yearsExperience', 'yearsTenure', 'title'];
    } else if (step === 'company') {
      reqQuestions = ['company', 'state'];
    } else if (step === 'personal') {
      reqQuestions = ['race', 'age', 'gender', 'sexuality'];
    }

    if (Object.keys(errors).length > 0) {
      hasError = true;
    }

    if (reqQuestions) {
      for (let i = 0; i <= reqQuestions.length - 1; i++) {
        if (
          !inputs.hasOwnProperty(reqQuestions[i]) ||
          inputs[reqQuestions[i]].trim() === ''
        ) {
          console.log('no own property');
          isIncomplete = true;
          break;
        }
      }
    }
    // if theres an error or incomplete form but the step is set as complete, set to false
    if ((hasError || isIncomplete) && currentStepComplete) {
      updateStepCompletionStatus(false);
    } else if (!hasError && !isIncomplete && !currentStepComplete) {
      updateStepCompletionStatus(true);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    postUserUpdates();
    console.log('in the submit form');
    history.push('/home');
  }

  function postUserUpdates() {
    console.log(inputs);
    let data = {
      job_title: inputs.title,
      company_name: inputs.company,
      company_city: null,
      industry: null,
      sexuality: inputs.sexuality,
      age: inputs.age,
      gender: inputs.gender,
      race: inputs.race,
      city: null,
      state: inputs.state,
      employee_type: inputs.employeeType,
      years_at_company: inputs.yearsTenure,
      years_of_experience: inputs.yearsExperience,
      base_salary: inputs.annualIncome,
      annual_bonus: inputs.annualBonus,
      stock_options: inputs.stockOptions,
      signing_bonus: null,
      full_time_status: inputs.ftStatus,
      active: true,
    };
    console.log(data);

    fetch('/api/onboardUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => console.log('Successful post'))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function renderNextStep() {
    // Intro step is basic user education about what this app does
    if (step === 'intro') {
      return (
        <React.Fragment>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={550}
          >
            <Typography variant="h3">How this works</Typography>
            <br />
            <br />
            <Typography variant="h6" align="center">
              We're about to ask you for deeply personal information, including
              your income, gender, race, and sexuality
              <br />
              <br />
              All data is encrypted and will only be viewable by individuals at
              your company with your same title <br />
              <br />
              Keeping your information personally identifiable is crucial for
              building trust in this system. <br />
              <br />
              Accurate and complete information is essential for ending
              workplace discrimination <br />
              <br />
            </Typography>
          </Box>
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            color="primary"
            variant="contained"
            disabled={!currentStepComplete}
            onClick={() => moveToNextStep()}
          >
            Next
          </Button>
        </React.Fragment>
      );
    }
    // enter company information
    else if (step === 'company') {
      return (
        <>
          <ErrorContext.Provider
            value={{ ...errors, handleChange: handleChange }}
          >
            <CompanyForm />
          </ErrorContext.Provider>
          <br />
          <br />
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            color="primary"
            variant="contained"
            onClick={() => moveToNextStep()}
            disabled={!currentStepComplete}
          >
            Next
          </Button>
        </>
      );
    } else if (step === 'title') {
      return (
        <>
          <ErrorContext.Provider
            value={{
              ...errors,
              handleChange: handleChange,
              companyName: inputs.company,
            }}
          >
            <JobTitleForm />
          </ErrorContext.Provider>
          <br />
          <br />
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            disabled={!currentStepComplete}
            color="primary"
            variant="contained"
            onClick={() => moveToNextStep()}
          >
            Next
          </Button>
        </>
      );
    }

    // Income step is to gather income data for the user's current role
    else if (step === 'income') {
      return (
        <>
          <InputContext.Provider value={inputs}>
            <ErrorContext.Provider
              value={{ ...errors, handleChange: handleChange }}
            >
              <IncomeForm />
            </ErrorContext.Provider>
          </InputContext.Provider>
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            disabled={!currentStepComplete}
            color="primary"
            variant="contained"
            onClick={() => moveToNextStep()}
          >
            Next
          </Button>
        </>
      );
    } else if (step === 'personal') {
      return (
        <>
          <ErrorContext.Provider
            value={{ ...errors, handleChange: handleChange }}
          >
            <PersonalForm />
          </ErrorContext.Provider>
          <Button
            // {...inputs.keys.length > 0 ? ' ': disabled}
            disabled={!currentStepComplete}
            // disabled
            color="primary"
            variant="contained"
            onClick={submitForm}
          >
            Complete
          </Button>
        </>
      );
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <br />
      <br />
      {renderNextStep()}
      {/* if on the final step of the form, render a "See results" button that submits the form responses to the DB */}
    </Box>
  );
}

export default GetStarted;
