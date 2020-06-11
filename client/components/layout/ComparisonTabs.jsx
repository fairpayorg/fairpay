import React from 'react';
import { Container, AppBar, Tabs, Tab } from '@material-ui/core';

const ComparisonTabs = ({ view, handleTabSwitch }) => {
  return (
    <Container id="comparison_tabs">
      <AppBar
        style={tabBarStyle}
        id="company_individual_toggle"
        position="static"
      >
        <Tabs view={view} onChange={handleTabSwitch} centered>
          <Tab label="Company Wide Comparison" />
          <Tab label="Individual Comparison" />
        </Tabs>
      </AppBar>
    </Container>
  );
};

// Styles
const tabBarStyle = {
  backgroundColor: '#ffe082',
  color: 'rgb(102, 102, 102)',
};

export default ComparisonTabs;
