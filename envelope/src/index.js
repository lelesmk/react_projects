import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import sonic from "./images/sonic.png";

const Envelope = ({ receiver, sender }) => {
  return (
    <div className="envelope">
      <div className="sender">
        <AddressLabel person={sender} />
      </div>
      <div className="receiver">
        <AddressLabel person={receiver} />
      </div>
      <div className="stamp">
        <Stamp />
      </div>
    </div>
  );
};

const Stamp = () => {
  return <img src={sonic} alt="stamp" className="stamp" />;
};

const AddressLabel = ({ person }) => {
  return (
    <div className="address-label">
      <span className="name">{person.fullName}</span>
      <span className="street">{person.address.street}</span>
      <div className="region">
        <span className="city">{person.address.city},</span>
        <span className="state">{person.address.state}</span>
        <span className="postal-code">{person.address.postal_code}</span>
      </div>
    </div>
  );
};

let fromPerson = {
  fullName: "Mr Sender",
  address: {
    street: "123 Fake St.",
    city: "Boston",
    state: "MA",
    postal_code: "02118",
  },
};

let toPerson = {
  fullName: "Ms Receiver",
  address: {
    street: "123 Fake St.",
    city: "Boston",
    state: "CA",
    postal_code: "94101",
  },
};

ReactDOM.render(
  <Envelope receiver={toPerson} sender={fromPerson} />,
  document.querySelector("#root")
);
