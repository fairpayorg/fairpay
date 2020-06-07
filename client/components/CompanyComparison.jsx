import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box } from "@material-ui/core";
import Race from "./Race_Company.jsx";
import Age from "./Age_Company.jsx";
import Gender from "./Gender_Company.jsx";
import Total from "./Total_Company.jsx";

function CompanyComparison(props) {
  const [value, setValue] = useState(0);

  const changeGraph = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index} id="company_comparison_div">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={changeGraph}
            className="vertical_tab_bar"
          >
            <Tab label="Aggregate"></Tab>
            <Tab label="Race"></Tab>
            <Tab label="Age"></Tab>
            <Tab label="Gender"></Tab>
          </Tabs>
          <Total value={value} index={0} graph={props.type} />
          <Race value={value} index={1} graph={props.type} />
          <Age value={value} index={2} graph={props.type} />
          <Gender value={value} index={3} graph={props.type} />
        </div>
      </Container>
    </React.Fragment>
  );
}

export default CompanyComparison;
