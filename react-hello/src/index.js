import React from "react";
import ReactDOM from "react-dom";

function Hello() {
  return <span>Hello</span>;
}

function World() {
  return <span>World</span>;
}

function HelloWorld() {
  return [<Hello />, <World />];
}

ReactDOM.render(<HelloWorld />, document.querySelector("#root"));
