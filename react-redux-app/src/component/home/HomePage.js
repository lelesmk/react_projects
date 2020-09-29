import React from "react";
import { Link } from "react-router-dom"; // so we dont post to server and routes are handled in the client

// using the arrow function to declare component
const HomePage = () => (
  <div className="jumbotron">
    <h1>Pluralsight Administration</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
