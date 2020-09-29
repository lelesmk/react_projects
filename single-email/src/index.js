import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const InMail = ({ email }) => {
  return (
    <div className="grid-container in-mail">
      <SelectButton />
      <Sender from={email.sender} />
      <Subject subject={email.subject} />
      <Date date={email.date} />
      <StarButton />
    </div>
  );
};

const SelectButton = () => {
  return (
    <div className="grid-item form-check">
      <input className="far fa-square" size="lg" type="checkbox" value="" />
    </div>
  );
};

const Sender = ({ from }) => <div className="grid-item sender">{from}</div>;
const Subject = ({ subject }) => (
  <div className="grid-item subject">{subject}</div>
);
const Date = ({ date }) => <div className="grid-tem date">{date}</div>;
const StarButton = () => {
  return (
    <a href="http://localhost:3000" className="grid-item star">
      <i className="far fa-star"></i>
    </a>
  );
};

let mail = {
  sender: "Uber Eats",
  subject: "Taste the world with R100 deals",
  date: "23/09/2020",
  message: "Save on faves for R100. A new cuisine experience each day at R100.",
};

ReactDOM.render(<InMail email={mail} />, document.querySelector("#root"));
