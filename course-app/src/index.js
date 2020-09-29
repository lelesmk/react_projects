import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

/**
 *  creates a const named render that references
 *  react-dom's render function.
 *  Equivalent to:
 *  import ReactDOM from 'react-dom';
 *  const render = ReactDOM.render;
 *  React-dom renders apps for web browsers.
 */
import { render } from "react-dom";

// import HomePage for rendering.
import App from "./components/App";

// import react router library
import { BrowserRouter as Router } from "react-router-dom";

// render app
render(
  // wrap App with router to enable declaring routes in our components
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
