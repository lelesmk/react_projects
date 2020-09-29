/**
 * import npm package React and set it
 * to a variable named react
 */
import React from "react";

import { Link } from "react-router-dom";

// declare a component - you can use a function or class
function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Flux, and React Router for ultra-responsive web apps.</p>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}

// export component to grant public access to other files.
export default HomePage;
