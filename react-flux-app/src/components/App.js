/** Route the pages based on the URL path */

import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CoursesPage from "./CoursesPage";
import AuthorsPage from "./AuthorsPage";

import ManageCoursePage from "../components/ManageCoursePage";
import ManageAuthorPage from "../components/ManageAuthorPage";

import { Route, Switch } from "react-router-dom";

import Header from "../common/Header";
import NotFoundPage from "./NotFoundPage";

// configure toastify notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// declare function component
function App() {
  return (
    <div className="container-fluid">
      {/** configure toastify container globally so we
       *   can call it anywhere in our app.
       */}
      <ToastContainer
        autoClose={3000} /** after 3 secs */
        hideProgressBar /** is boolean, but omitting setting true infers truthiness */
      />

      {/** render header */}
      <Header />
      {/** declare application's routes
       *  (Route component takes two props
       *   1. the path which declares the URL to look for
       *   2. the component it will load on match
       *   The 'exact' keyword constrains the Route to an
       *   an exact path match else any route with "/" will
       *   be loaded)
       */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" exact component={CoursesPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/course/:slug" exact component={ManageCoursePage} />
        <Route path="/course" exact component={ManageCoursePage} />
        <Route path="/authors" exact component={AuthorsPage} />
        <Route path="/author" exact component={ManageAuthorPage} />
        {/** when a path is not specified all routes
         *   point to the declared component, unless
         *   routes are wrapped inside a switch statement.
         *   Inside a switch React-Route check the sequence
         *   of routes and stops when a match is found. */}
        <Route path="/404-Page-Not-Found" component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

// export component
export default App;
