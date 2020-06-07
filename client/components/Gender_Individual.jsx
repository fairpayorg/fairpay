import React from "react";
import { Container } from "@material-ui/core";

function Gender(props) {

  return (
    <React.Fragment>
      <Container>
        <div hidden={props.value !== props.index} id="gender_comparison_div">
          <h1>inside gender comparison</h1>
          <h1>{props.graph}</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Gender;
