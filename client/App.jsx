import React, { Component, useState } from 'react';
// import { useState } from "react-hooks";
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
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import GetStarted from './components/GetStarted.jsx';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
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
      <AppBar position="static" id="appBar">
        <Tabs>
          <Tab icon={<HomeRoundedIcon style={{ fontSize: 30 }} />} />
          <Tab icon={<PersonRoundedIcon style={{ fontSize: 30 }} />} />
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
    </div>
  );
};

export default App;
