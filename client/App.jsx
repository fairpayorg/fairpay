import React, { Component, useState } from 'react';
// import { useState } from "react-hooks";
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Typography,
  SvgIcon,
  ThemeProvider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#b2dfdb',
    },
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static" id="appBar">
          <Tabs value={0} variant="fullWidth">
            <Tab label="FairPay" icon={<GraphicEqRoundedIcon />} />
            {/* <Tab label="User" icon={<PersonRoundedIcon />} /> */}
          </Tabs>
        </AppBar>
        <Router>
          <Switch>
            <Route exact path="/getstarted">
              <GetStarted />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
