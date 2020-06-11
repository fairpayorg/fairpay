import React, { useState, useEffect } from 'react';
// import { useState } from "react-hooks";

function Login(props) {
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1>Be an agent of change</h1>
        <h2>
          Securely submit your salary information to understand if you or your
          coworkers are being discriminated against
        </h2>
        <a href="/auth/linkedin">
          <img
            src="https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png"
            id="linkedinButton"
          ></img>
        </a>
      </div>
    </div>
  );
}

export default Login;
