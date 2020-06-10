import React, { useState } from 'react';
import Home from './Home.jsx'
import { render } from 'react-dom';
import { Redirect, useHistory } from 'react-router-dom'
import TitleCount from './TitleCount.jsx';

///////////////////forms//////////////////
import IntroStep from './getStarted/IntroStep.jsx';
import IncomeStep from './getStarted/IncomeStep_salary.jsx';
import PersonalStep from './getStarted/PersonalStep.jsx';
import IncomeStep_salary from './getStarted/IncomeStep_salary.jsx';
import CompanyStep from './getStarted/CompanyStep.jsx';
import TitleStep from './getStarted/TitleStep.jsx';
// imported material ui components 
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetStarted(props) {
  const history = useHistory()
  // the "step" control defines which part of the three step flow the user is on
  const [step, setStep] = useState('intro');
  // initialize inputs as an empty object
  // every time we udpate inputs, we'll use the setInput functio
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [titleCount, setTitleCount] = useState(null);
  const [currentStepComplete, updateStepCompletionStatus] = useState(false);

  const steps = ['intro', 'company', 'title', 'income', 'personal', 'complete'];
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function is called each time user clicks  'next'
  function moveToNextStep() {
    if (step === 'company') getRoleCount(inputs.company);
    setStep(steps[steps.indexOf(step) + 1]);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // returns array of counts for each title at a given company
  function getRoleCount(company) {
    const data = { company_name: company };

    fetch('/api/jobTitles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((givenData) => setTitleCount(givenData))
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // called each time an input changes
  // updates state, checks for validation errors, and updates disable status of button
  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    handleError(name, value);
    determineIfStepComplete();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleError(name, value) {
    // for every change in the input, we're going to check whether that passes our validation requirements
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
      if (isNaN(Number(value))) error = 'Please enter a number';
    }

    if (error !== undefined) {
      setErrors((prevState) => ({ ...prevState, [name]: error }));
    }
    // if there is an error in the error object but the input has passed all tests, remove the error from error object
    else if (errors.hasOwnProperty(name)) delete errors[name];
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // this function determines whether the next button is disabled
  function determineIfStepComplete() {
    let hasError = false;
    let isIncomplete = false;
    let reqQuestions;

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
    }

    if (Object.keys(errors).length > 0) {
      hasError = true;
    }

    if (reqQuestions) {
      for (let i = 0; i <= reqQuestions.length - 1; i++) {
        if (!inputs.hasOwnProperty(reqQuestions[i])) {
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function submitForm(e) {
    e.preventDefault()
    postUserUpdates();
    console.log('in the submit form')
    history.push('/home')
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function renderIncomeQuestions() {
    if (inputs.employeeType === 'Salary') {
      return (
        <IncomeStep_salary
          moveToNextStep={moveToNextStep}
          errors={errors}
          handleChange={handleChange}
          currentStepComplete={currentStepComplete}
        />
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function renderNextStep() {
    // Intro step is basic user education about what this app does
    if (step === 'intro') {
      return (
        <IntroStep
          moveToNextStep={moveToNextStep}
        />
      );
    }
    // enter company information
    else if (step === 'company') {
      return (
        <CompanyStep
          errors={errors}
          handleChange={handleChange}
          currentStepComplete={currentStepComplete}
          moveToNextStep={moveToNextStep}
        />
      );
    } else if (step === 'title') {
      return (
        <TitleStep
          TitleCount={titleCount}
          errors={errors}
          handleChange={handleChange}
          currentStepComplete={currentStepComplete}
          moveToNextStep={moveToNextStep}
        />
      );
    }

    // Income step is to gather income data for the user's current role
    else if (step === 'income') {
      return (
        <IncomeStep
          renderIncomeQuestions={renderIncomeQuestions}
          handleChange={handleChange}
          currentStepComplete={currentStepComplete}
          moveToNextStep={moveToNextStep}
        />
      );
    } else if (step === 'personal') {
      return (
        <PersonalStep
          submitForm={submitForm}
          handleChange={handleChange}
          currentStepComplete={currentStepComplete}
        />
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container maxWidth="sm">
      <br />
      <br />
      {renderNextStep()}
      {/* if on the final step of the form, render a "See results" button that submits the form responses to the DB */}
    </Container>
  );
}

export default GetStarted;