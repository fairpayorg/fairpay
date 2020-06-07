import React from "react";
import { Container } from "@material-ui/core";

function Total(props) {
  return (
    <React.Fragment>
      <Container>
        <div hidden={props.value !== props.index} id="total_comparison_div">
          <h1>Inside Total comparisons</h1>
          <h1>{props.graph}</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Total;
