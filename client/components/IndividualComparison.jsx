import React, { useState } from "react";
import { Container, Tabs, Tab } from "@material-ui/core";
import Race from "./Race_Individual.jsx";
import Age from "./Age_Individual.jsx";
import Gender from "./Gender_Individual.jsx";
import Total from "./Total_Individual.jsx";

function IndividualComparison(props) {
  const [value, setValue] = useState(0);

  const changeGraph = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index} id="individual_comparison_div">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={changeGraph}
            className="vertical_tab_bar"
          >
            <Tab label="Aggregate" />
            <Tab label="Race" />
            <Tab label="Age" />
            <Tab label="Gender" />
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

export default IndividualComparison;
