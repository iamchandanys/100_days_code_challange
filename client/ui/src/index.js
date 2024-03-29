import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import VidlyApp from "./components/vidly/vidly-app";

ReactDOM.render(
  <BrowserRouter>
    <VidlyApp />
  </BrowserRouter>,
  document.getElementById("root")
);
