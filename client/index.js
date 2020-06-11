import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./App.jsx";
import "regenerator-runtime/runtime";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
