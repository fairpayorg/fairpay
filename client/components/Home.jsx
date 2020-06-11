import React, { useState, useEffect, useContext } from 'react';
import { Container } from '@material-ui/core';
import CompanyComparison from './CompanyComparison.jsx';
import IndividualComparison from './IndividualComparison.jsx';
import UserHeader from './layout/UserHeader.jsx';
import { UserContext } from './contexts/userContext.js';
import ComparisonTabs from './layout/ComparisonTabs.jsx';
import BarChart from './BarChart.jsx';

const Home = () => {
  const { fetchUserData } = useContext(UserContext);
  // const [view, setView] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedFocus, setselectedFocus] = useState("race");

  // Watch tab switching
  const handleTabSwitch = (e, view) => {
    setSelectedFocus(view);
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);


  return (
    <React.Fragment>
      <UserHeader />
      {loading ? (
        <h2 className="current_user_header">Loading Data...</h2>
      ) : (
        <div id="tables_div">
          <Container>         
            <svg viewBox="-2 0 500 500" preserveAspectRatio="xMidYMid meet">
              <BarChart 
                positionX={30} 
                positionY={320} 
                width={500} 
                height={300}    
                index={0}
                selectedFocus={selectedFocus}
              />
            </svg>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
