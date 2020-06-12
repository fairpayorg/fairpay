import React, { useState, useEffect } from 'react';
// import { useState } from "react-hooks";

function Login(props) {
  return (
    <div className="loginContainer">
      <div className="loginBox">
        
        <img id='jelly' src='https://i.pinimg.com/474x/30/3a/c6/303ac6dc3697b44947dece34ffc03226.jpg'></img>
        <h2 id='jellyfp'>Jelly inc.</h2>
        <p id='wunder'>w/ The Wonderpus Team</p> 
        <p>~presents~</p>
        <h1 id='fairp'>FAIRPAY</h1>
        <h2>Be an agent of change</h2>
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
