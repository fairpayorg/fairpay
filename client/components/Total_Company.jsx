import React from "react";
import { Container } from "@material-ui/core";

function Total(props) {
  return (
    <React.Fragment>
      <div hidden={props.value !== props.index || props.view === 1}>
        <div className="data_display_div">
          <h1>Inside Total comparisons</h1>
          <h3>we're gonna want to show the user's information at the top</h3>
          <h3>
            Then we display the aggregate of all employees at same company with
            same title
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Total;
