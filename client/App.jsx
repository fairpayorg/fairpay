import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import GetStarted from './components/GetStarted.jsx';
import Header from './components/layout/Header.jsx';

import './stylesheets/styles.css';
import UserContextProvider from './components/contexts/userContext.js';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <UserContextProvider>
          <Route exact path="/getstarted" component={GetStarted} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Login} />
        </UserContextProvider>
      </Switch>
    </React.Fragment>
  );
};

export default App;
