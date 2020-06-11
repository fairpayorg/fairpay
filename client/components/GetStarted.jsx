import React, { useState } from "react";
import Home from "./Home.jsx";
import { render } from "react-dom";
import { Redirect, useHistory } from "react-router-dom";
import TitleCount from "./TitleCount.jsx";
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
} from "@material-ui/core";

function GetStarted(props) {
  const history = useHistory();
  // the "step" control defines which part of the three step flow the user is on
  const [step, setStep] = useState("intro");
  // initialize inputs as an empty object
  // every time we udpate inputs, we'll use the setInput functio
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [titleCount, setTitleCount] = useState(null);
  const [currentStepComplete, updateStepCompletionStatus] = useState(false);

  const steps = ["intro", "company", "title", "income", "personal", "complete"];

  // function is called each time user clicks  'next'
  function moveToNextStep() {
    if (step === "company") {
      console.log(inputs.company);
      console.log("city", inputs.city);
      getRoleCount(inputs.company);
    }
    setStep(steps[steps.indexOf(step) + 1]);
  }

  // returns array of counts for each title at a given company
  async function getRoleCount(company) {
    const data = { company_name: company };

    const result = await fetch("/api/jobTitles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const data = await result.json();
      setTitleCount(data);
    } catch (err) {
      return err;
    }
  }

  // called each time an input changes
  // updates state, checks for validation errors, and updates disable status of button
  function handleChange(event) {
    const { name, value } = event.target;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
    handleError(name, value);
    determineIfStepComplete();
  }

  function handleError(name, value) {
    // for every change in the input, we're going to check whether that passes our validation requirements
    let error;
    const numberFields = [
      "annualIncome",
      "annualBonus",
      "stockOptions",
      "hourlyWage",
      "yearsExperience",
      "yearsTenure",
    ];
    if (numberFields.includes(name)) {
      if (isNaN(Number(value))) {
        error = "Please enter a number";
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

    // determine required questions for a given step
    if (
      step === "income" &&
      (!inputs.employeeType || inputs.employeeType === "Salary")
    ) {
      reqQuestions = [
        "employeeType",
        "annualIncome",
        "annualBonus",
        "stockOptions",
      ];
    } else if (
      step === "income" &&
      (!inputs.employeeType || inputs.employeeType === "Hourly")
    ) {
      reqQuestions = ["employeeType", "hourlyWage", "ftStatus"];
    } else if (step === "title") {
      reqQuestions = ["yearsExperience", "yearsTenure", "title"];
    } else if (step === "company") {
      reqQuestions = ["company", "state"];
    }

    if (Object.keys(errors).length > 0) {
      hasError = true;
    }

    if (reqQuestions) {
      for (let i = 0; i <= reqQuestions.length - 1; i++) {
        if (!inputs.hasOwnProperty(reqQuestions[i])) {
          console.log("no own property");
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
    console.log("in the submit form");
    history.push("/home");
  }

  async function postUserUpdates() {
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
      city: inputs.city,
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

    const result = await fetch("/api/onboardUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const data = await result.json();
      console.log(data);
    } catch (err) {
      return err;
    }
  }

  function renderIncomeQuestions() {
    if (inputs.employeeType === "Salary") {
      return (
        <React.Fragment>
          {/* Text input for annual salary*/}
          <br />
          <br />
          <TextField
            required
            error={errors.hasOwnProperty("annualIncome") ? true : false}
            helperText={
              errors.hasOwnProperty("annualIncome")
                ? errors["annualIncome"]
                : ""
            }
            id="annual-income-input"
            label="Annual Income (pre-tax)"
            variant="outlined"
            name="annualIncome"
            // prepends $ at the beginning of the input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <br />
          <br />
          {/* TODO: allow a N/A option for the annual bonus input */}
          <TextField
            required
            id="bonus-input"
            label="Last annual bonus"
            error={errors.hasOwnProperty("annualBonus") ? true : false}
            helperText={
              errors.hasOwnProperty("annualBonus") ? errors["annualBonus"] : ""
            }
            // helperText="Incorrect entry."
            variant="outlined"
            name="annualBonus"
            // prepends $ at the beginning of the input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <br />
          <br />
          {/* TODO: allow a N/A option for the stock options input */}
          <TextField
            required
            id="stock-options-input"
            label="Total stock options "
            // helperText="Incorrect entry."
            error={errors.hasOwnProperty("stockOptions") ? true : false}
            helperText={
              errors.hasOwnProperty("stockOptions")
                ? errors["stockOptions"]
                : ""
            }
            variant="outlined"
            name="stockOptions"
            onChange={handleChange}
          />
        </React.Fragment>
      );
    } else if (inputs.employeeType === "Hourly") {
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
            // prepends $ at the beginning of the input
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={handleChange}
            error={errors.hasOwnProperty("hourlyWage") ? true : false}
            helperText={
              errors.hasOwnProperty("hourlyWage") ? errors["hourlyWage"] : ""
            }
          />
          <br />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup
              aria-label="Part time or full time?"
              name="ftStatus"
              onChange={handleChange}
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
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            color="primary"
            variant="contained"
            onClick={() => moveToNextStep()}
          >
            Next
          </Button>
        </React.Fragment>
      );
    }
    // enter company information
    else if (step === "company") {
      return (
        <React.Fragment>
          <TextField
            required
            id="company"
            key="company"
            label="Company"
            // helperText="Incorrect entry."
            variant="outlined"
            name="company"
            onChange={handleChange}
            error={errors.hasOwnProperty("company") ? true : false}
            helperText={
              errors.hasOwnProperty("company") ? errors["company"] : ""
            }
          />
          <br />
          <br />
          <TextField
            required
            id="city"
            key="city"
            label="City"
            // helperText="Incorrect entry."
            variant="outlined"
            name="city"
            onChange={handleChange}
            error={errors.hasOwnProperty("city") ? true : false}
            helperText={errors.hasOwnProperty("city") ? errors["city"] : ""}
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
            onChange={handleChange}
            error={errors.hasOwnProperty("state") ? true : false}
            helperText={errors.hasOwnProperty("state") ? errors["state"] : ""}
          />
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
        </React.Fragment>
      );
    } else if (step === "title") {
      return (
        <React.Fragment>
          <TextField
            required
            id="years-experience-input"
            key="years-experience-input"
            label="# years in this industry"
            // helperText="Incorrect entry."
            variant="outlined"
            name="yearsExperience"
            onChange={handleChange}
            error={errors.hasOwnProperty("yearsExperience") ? true : false}
            helperText={
              errors.hasOwnProperty("yearsExperience")
                ? errors["yearsExperience"]
                : ""
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
            onChange={handleChange}
            error={errors.hasOwnProperty("yearsTenure") ? true : false}
            helperText={
              errors.hasOwnProperty("yearsTenure") ? errors["yearsTenure"] : ""
            }
          />
          <br />
          <br />
          <p>
            {" "}
            You'll only be compared to people at your company with your same
            title. Here are the titles that other employees at your company have
            used:
          </p>
          <TitleCount titles={titleCount} />
          <br />
          <TextField
            required
            id="title"
            label="Title"
            key="title"
            // helperText="Incorrect entry."
            variant="outlined"
            name="title"
            onChange={handleChange}
            error={errors.hasOwnProperty("title") ? true : false}
            helperText={errors.hasOwnProperty("title") ? errors["title"] : ""}
          />
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
        </React.Fragment>
      );
    }

    // Income step is to gather income data for the user's current role
    else if (step === "income") {
      return (
        <React.Fragment>
          <form autoComplete="off">
            {/* Radio button about whether user is paid hourly or by salary */}
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">How are you paid?</FormLabel>
              <RadioGroup
                aria-label="employee type"
                name="employeeType"
                onChange={handleChange}
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
          <Button
            // {inputs.keys.length > 0 ? disabled : color="primary"}
            disabled={!currentStepComplete}
            color="primary"
            variant="contained"
            onClick={() => moveToNextStep()}
          >
            Next
          </Button>
        </React.Fragment>
      );
    } else if (step === "personal") {
      return (
        <React.Fragment>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              What race your identify with?
            </FormLabel>
            <RadioGroup aria-label="race" name="race" onChange={handleChange}>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            <RadioGroup aria-label="age" name="age" onChange={handleChange}>
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
            disabled={!currentStepComplete}
            // disabled
            color="primary"
            variant="contained"
            onClick={submitForm}
          >
            Complete
          </Button>
        </React.Fragment>
      );
    }
  }

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
