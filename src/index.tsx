import React from "react";
import "./index.css";
import history from "./tools/history";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
