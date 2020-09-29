import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const CreditCard = ({ cardholder }) => {
  return (
    <div className="grid-container credit-card">
      <div className="grid-item bank">
        <BankLogo bank={cardholder.bank} />
      </div>
      <div className="grid-item account">
        <AccNumber account={cardholder.acc_num} />
      </div>
      <div className="grid-item cvv">
        <Cvv cvv={cardholder.cvv} />
      </div>
      <div className="grid-item valid">
        VALID <br /> THRU
      </div>
      <div className="grid-item expiry">
        <ExpiryDate expiry={cardholder.expiry_date} />
      </div>
      <div className="grid-item cardholder">
        <CardHolder name={cardholder.full_name} />
      </div>
    </div>
  );
};

const BankLogo = ({ bank }) => <span>{bank}</span>;
const CardHolder = ({ name }) => <span>{name}</span>;
const AccNumber = ({ account }) => <span>{account}</span>;
const Cvv = ({ cvv }) => <span>{cvv}</span>;
const ExpiryDate = ({ expiry }) => (
  <div className="grid-item date">{expiry}</div>
);

let cardInfo = {
  full_name: "MR CARDHOLDER",
  bank: "Big Bank, Inc.",
  acc_num: "1234 5678 8765 4321",
  expiry_date: "08/19",
  cvv: "1234",
};

ReactDOM.render(
  <CreditCard cardholder={cardInfo} />,
  document.querySelector("#root")
);
