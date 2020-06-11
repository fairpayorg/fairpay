import React, { useState, useEffect, useContext } from 'react';
import { Container } from '@material-ui/core';
import CompanyComparison from './CompanyComparison.jsx';
import IndividualComparison from './IndividualComparison.jsx';
import UserHeader from './layout/UserHeader.jsx';
import { UserContext } from './contexts/userContext.js';
import ComparisonTabs from './layout/ComparisonTabs.jsx';

const Home = () => {
  const { fetchUserData } = useContext(UserContext);
  const [view, setView] = useState(0);
  const [loading, setLoading] = useState(true);

  // Watch tab switching
  const handleTabSwitch = (e, view) => {
    setView(view);
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <UserHeader />
      <ComparisonTabs view={view} handleTabSwitch={handleTabSwitch} />
      {loading ? (
        <h2 className="current_user_header">Loading Data...</h2>
      ) : (
        <div id="tables_div">
          <Container>
            <CompanyComparison view={view} index={0} />
            <IndividualComparison view={view} index={1} />
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
