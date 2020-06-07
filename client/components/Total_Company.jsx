import React from "react";
import { Container } from "@material-ui/core";

function Total(props) {
  console.log("props", props);
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <h1>Inside Total comparisons</h1>
        <h1>{props.graph}</h1>
      </div>
    </React.Fragment>
  );
}

export default Total;
