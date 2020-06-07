import React from "react";
import { Container } from "@material-ui/core";

export default function Age(props) {
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.value !== props.index} id="age_comparison_div">
          <h1>inside age comparison</h1>
          <h1>{props.graph}</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}
