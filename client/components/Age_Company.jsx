import React from "react";
import { Container } from "@material-ui/core";

export default function Age(props) {
  return (
    <React.Fragment>
      <div
        hidden={props.value !== props.index || props.view === 1}
        id="age_comparison_div"
      >
        <h1>inside age comparison</h1>
        <h1>{props.graph}</h1>
      </div>
    </React.Fragment>
  );
}
