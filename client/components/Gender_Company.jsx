import React from "react";
import { Container } from "@material-ui/core";

function Gender(props) {
  return (
    <React.Fragment>
      <div
        hidden={props.value !== props.index || props.view === 1}
        id="gender_comparison_div"
      >
        <h1>inside gender comparison</h1>
        <h1>{props.graph}</h1>
      </div>
    </React.Fragment>
  );
}

export default Gender;
