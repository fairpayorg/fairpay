import React from "react";
import { Container } from "@material-ui/core";

function Gender(props) {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <h1>inside gender comparison</h1>
          <h3>First display user's information</h3>
          <h3>Then we display the averages for every gender</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Gender;
