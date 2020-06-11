import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { PersonRounded, GraphicEqRounded } from '@material-ui/icons';

const Header = () => {
  return (
    <AppBar position="static" id="appBar">
      {/* Value property should be added to the Tabs component -> https://material-ui.com/components/tabs/ */}
      <Tabs variant="fullWidth">
        <Tab label="FairPay" icon={<GraphicEqRounded />} />
        <Tab label="User" icon={<PersonRounded />} />
      </Tabs>
    </AppBar>
  );
};

export default Header;
