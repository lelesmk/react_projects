import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import discovery from "./discovery.png";

const Poster = ({ dmotivation }) => {
  return (
    <div className="grid-container poster">
      <Picture hero={dmotivation.picture} />
      <Title title={dmotivation.title} />
      <Body slogan={dmotivation.slogan} />
    </div>
  );
};

const Picture = ({ hero }) => <div className="grid-item main">{hero}</div>;
const Title = ({ title }) => <div className="grid-item title">{title}</div>;
const Body = ({ slogan }) => <div className="grid-item slogan">{slogan}</div>;

let starTrek = {
  picture: <img src={discovery} alt="discovery" className="hero" />,
  title: "WHO'S AWESOME?",
  slogan: "DISCOVERY FANS ARE AWESOME!",
};

ReactDOM.render(
  <Poster dmotivation={starTrek} />,
  document.querySelector("#root")
);
