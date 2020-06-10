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
<<<<<<< HEAD
=======
      {/* AppBar, Tabs, Tab is a material ui component */}
>>>>>>> c60097c1319fa388510899215dae7b3b6e4a82d1
      {/* <AppBar position="static" id="appBar">
        <Tabs variant="fullWidth">
          <Tab label="FairPay" icon={<GraphicEqRoundedIcon />} />
          <Tab label="User" icon={<PersonRoundedIcon />} />
        </Tabs>
      </AppBar> */}
<<<<<<< HEAD
=======
      
{/*ADD NAV BAR HERE ONCE MADE  */}

>>>>>>> c60097c1319fa388510899215dae7b3b6e4a82d1
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
