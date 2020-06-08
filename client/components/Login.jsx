import React from 'react';
// import { useState } from "react-hooks";
import Button from '@material-ui/core/Button';

function Login(props) {
  //   console.log("props vs index", props.value, props.index);

  return (
    <div>
      <h1>Be an agent of change</h1>
      <h2>
        Securely submit your salary information to understand if you or your
        coworkers are being discriminated against
      </h2>
      {/* TODO: link to LinkedIn OAuth*/}
      <img
        src="https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png"
        id="linkedinButton"
      />
    </div>
  );
}

export default Login;
