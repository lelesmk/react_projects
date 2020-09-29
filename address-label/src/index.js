import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const AddressLabel = () => {
  return (
    <div className="address-label">
      <span className="name">Full Name</span>
      <span className="street">123 Fake St.</span>
      <div className="region">
        <span className="city">Boston,</span>
        <span className="state">MA</span>
        <span className="postal-code">02118</span>
      </div>
    </div>
  );
};

ReactDOM.render(<AddressLabel />, document.querySelector("#root"));
