import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // import minified version of bootstrap
import App from "./component/App";
import "../src/index.css";
import configureStore from "./redux/configureStore";

//import Provider component from redux library to channel Redux store data to child components
import { Provider as ReduxProvider } from "react-redux";

// Instantiate the store
const store = configureStore(); // pass initial data into store if rendering from server or localStorage

/**
 *  Initialising the store with data:
 *  - Data initialising the store here overides the initial default state defined
 *    in our reducers.
 *  - To rehidrate our store with data from the server or data from localStorage
 *    we pass storage data here in configureStore(initialeState);
 */

// Entry for app
render(
  // Provide store data to child components
  <ReduxProvider store={store}>
    {/* render App function */}
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  // point it the DOM element created in index.html to mount the application
  document.getElementById("app")
);
