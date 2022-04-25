import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line no-unused-vars
import App from "./components/app";
import Vidly from "./components/vidly/vidly";

ReactDOM.render(<Vidly />, document.getElementById("root"));
