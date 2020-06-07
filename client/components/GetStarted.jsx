import React, { useState, setState } from "react";
import { render } from "react-dom";
import {
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
// import e from 'express';

function GetStarted(props) {
  const [step, setStep] = useState("intro");
  const [employeeType, setEmployeeType] = useState(null);

  const steps = ["intro", "income", "personal", "complete"];

  function moveToNextStep() {
    setStep(steps[steps.indexOf(step) + 1]);
    if (step === "complete") {
      // TBD
    }
  }

  // update employee type
  function handleChange(event) {
    const { name, value } = event.target;
    // setState(prevState => ({ ...prevState, [name]: value }));
    console.log("name: ", name, "value: ", value);
    setEmployeeType(value);
    console.log(employeeType);
  }

  function renderIncomeQuestions() {
    if (employeeType === "Salary") {
      return (
        <React.Fragment>
          {/* Text input for annual salary*/}
          <br />
          <br />
          <TextField
            required
            id="annual-income-input"
            label="Annual Income (pre-tax)"
            // helperText="Incorrect entry."
            variant="outlined"
            name="annualIncome"
          />
          <br />
          <br />
          {/* TODO: allow a N/A option for the annual bonus input */}
          <TextField
            required
            id="bonus-input"
            label="Last annual bonus"
            // helperText="Incorrect entry."
            variant="outlined"
            name="annualBonus"
          />
          <br />
          <br />
          {/* TODO: allow a N/A option for the stock options input */}
          <TextField
            required
            id="stock-options-input"
            label="Total stock options "
            // helperText="Incorrect entry."
            variant="outlined"
            name="stockOptions"
          />
        </React.Fragment>
      );
    } else if (employeeType === "Hourly") {
      return (
        <React.Fragment>
          <br />
          <br />
          <TextField
            required
            id="hourly-wage-input"
            label="Hourly wage (pre-tax)"
            // helperText="Incorrect entry."
            variant="outlined"
            name="hourlyWage"
          />
          <br />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup
              aria-label="Part time or full time?"
              name="partTime"
              // onChange={handleChange}
              // value={employeeType}
            >
              <FormControlLabel
                value="Part Time"
                control={<Radio />}
                label="Part Time"
              />
              <FormControlLabel
                value="Full Time"
                control={<Radio />}
                label="Part Time"
              />
            </RadioGroup>
          </FormControl>
        </React.Fragment>
      );
    }
  }

  function renderNextStep() {
    // Intro step is basic user education about what this app does
    if (step === "intro") {
      return (
        <React.Fragment>
          <h1>How this works</h1>
          <h3>
            We're about to ask you for deeply personal information, including
            your income, gender, race, and sexuality <br />
            <br />
            All data is encrypted and will only be viewable by individuals at
            your company with your same title <br />
            <br />
            Keeping your information personally identifiable is crucial for
            building trust in this system. <br />
            <br />
            Accurate and complete information is essential for ending workplace
            discrimination <br />
          </h3>
        </React.Fragment>
      );
    }
    // Income step is to gather income data for the user's current role
    else if (step === "income") {
      return (
        <React.Fragment>
          <form autoComplete="off">
            {/* Radio button about whether user is paid hourly or by salary */}
            {/* <p>Please give a sense a of your total experience</p> */}
            <TextField
              required
              id="years-experience-input"
              label="# years in this industry"
              // helperText="Incorrect entry."
              variant="outlined"
              name="yearsExperience"
            />
            <br />
            <br />
            <TextField
              required
              id="years-tenure"
              label="# years at company"
              // helperText="Incorrect entry."
              variant="outlined"
              name="yearsTenure"
            />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">How are you paid?</FormLabel>
              <RadioGroup
                aria-label="employee type"
                name="employeeType"
                onChange={handleChange}
                value={employeeType}
              >
                <FormControlLabel
                  value="Salary"
                  control={<Radio />}
                  label="Salary"
                />
                <FormControlLabel
                  value="Hourly"
                  control={<Radio />}
                  label="Hourly"
                />
              </RadioGroup>
            </FormControl>
            {/* Depending on whether the user is salaried or hourly, we'll ask different income questiosn */}
            {renderIncomeQuestions()}
            <br />
            <br />
          </form>
        </React.Fragment>
      );
    } else if (step === "income") {
      return <div>In the income step</div>;
    }
  }

  return (
    <Container maxWidth="sm">
      {renderNextStep()}
      <Button
        color="primary"
        variant="contained"
        onClick={() => moveToNextStep()}
      >
        Next
      </Button>
    </Container>
  );
}

export default GetStarted;
