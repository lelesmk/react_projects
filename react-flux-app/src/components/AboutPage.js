/**
 * import npm package React and set it
 * to a variable named react
 */
import React from "react";

// declare a component - you can use a function or class
class AboutPage extends React.Component {
  render() {
    return (
      <>
        <h2>About</h2>
        <p>This app uses React.</p>
      </> // React.Fragment equals <></> forces 1:1 function:top-level element without rendering anything extra
    );
  }
}

// export component to grant public access to other files.
export default AboutPage;
