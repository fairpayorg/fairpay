import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button, Typography, SvgIcon } from '@material-ui/core';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import GetStarted from './components/GetStarted.jsx';
import Header from './components/layout/Header.jsx';

import './stylesheets/styles.css';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/getstarted" component={GetStarted} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
