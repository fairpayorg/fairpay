import React from 'react';
// import { useState } from "react-hooks";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import GetStarted from './components/GetStarted.jsx';
import { Switch, Route } from 'react-router-dom';

import './components/stylesheets/styles.css';

const App = () => {
  return (
    <div>
      <AppBar position="static" id="appBar">
        <Tabs variant="fullWidth">
          <Tab label="FairPay" icon={<GraphicEqRoundedIcon />} />
          <Tab label="User" icon={<PersonRoundedIcon />} />
        </Tabs>
      </AppBar>
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
    </div>
  );
};

export default App;
