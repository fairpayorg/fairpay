import React from "react";
import { Container } from "@material-ui/core";

export default function Age(props) {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <h1>inside age comparison</h1>
          <h3>Display the user's information at the top</h3>
          <h3>
            then we display the average information for all the age ranges
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
}
