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
import HomeIcon from '@material-ui/icons/Home';
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
      <AppBar position="static" id="appBar">
        <Tabs>
          <Tab icon={<HomeIcon />} />
          <Tab />
        </Tabs>
      </AppBar>
      <Router>
        <Link to="/home">go to home</Link>
        <Link to="/">go to login page</Link>
        <Link to="/getstarted">go to get started</Link>

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
