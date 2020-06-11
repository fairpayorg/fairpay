import React, { useState, useEffect } from 'react';
// import { useState } from "react-hooks";

function Login(props) {
  //   console.log("props vs index", props.value, props.index);

  //NEEDS RESTYLING!!
  return (
    <div>
      <h1>Be an agent of change</h1>
      <h2>
        Securely submit your salary information to understand if you or your
        coworkers are being discriminated against
      </h2>
      {/* link to linkedin oauth */}
      <a href="/auth/linkedin">
        <img
          src="https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png"
          id="linkedinButton"
        ></img>
      </a>
    </div>
  );
}

export default Login;
