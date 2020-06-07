import React from "react";
import { Container } from "@material-ui/core";

function Race(props) {
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.value !== props.index} id="race_comparison_div">
          <h1>Inside race comparisons</h1>
          <h1>{props.graph}</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Race;
