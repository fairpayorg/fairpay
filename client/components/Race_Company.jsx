import React from "react";
import { Container } from "@material-ui/core";

function Race(props) {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <h1>Inside race comparisons</h1>
          <h3>We show the user's information at the top for easy comparison</h3>
          <h3>Then we display the averages for every race</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Race;
