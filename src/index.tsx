import React from "react";
import "./index.css";
import history from "./tools/history";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
