import React, { useEffect, useState } from "react";

// import { useState } from "react-hooks";

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
      <a href="/auth/linkedin">Sign in with LinkedIn</a>
    </div>
  );
}

export default Login;
