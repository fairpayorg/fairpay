import React, { Component, useState } from 'react';
// import { useState } from "react-hooks";

// import material ui components
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  SvgIcon,
} from '@material-ui/core';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import GetStarted from './components/GetStarted.jsx';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import './components/stylesheets/styles.css';

const App = () => {
  return (
    <div>
      {/* AppBar, Tabs, Tab is a material ui component */}
      {/* <AppBar position="static" id="appBar">
        <Tabs variant="fullWidth">
          <Tab label="FairPay" icon={<GraphicEqRoundedIcon />} />
          <Tab label="User" icon={<PersonRoundedIcon />} />
        </Tabs>
      </AppBar> */}
      
{/*ADD NAV BAR HERE ONCE MADE  */}

      <Router>
        <Switch>
{/* this is the form page */}
          <Route exact path="/getstarted">
            <GetStarted />
          </Route>

{/* displayed the user name at the top and the charts */}
          <Route exact path="/home">
            <Home />
          </Route>

{/* This is the linked in button */}
          <Route exact path="/">
            <Login />
          </Route>

        </Switch>
      </Router>
    </div>
  );
};

export default App;
