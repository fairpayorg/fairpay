import React, { useState } from "react";
import { Container, Tabs, Tab } from "@material-ui/core";

function IndividualComparison(props) {
  // need to write logic that loops through the data we get back from the fetch request and renders
  // all the employee data who work at the same company with the same title
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.view !== props.index} id="individual_comparison_div">
          {/* render the array of employees here */}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default IndividualComparison;
