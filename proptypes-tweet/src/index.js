import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import moment from "moment";
import PropTypes from "prop-types";

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <Avatar hash={tweet.gravatar} />
      <div className="content">
        <NameWithHandle author={tweet.author} />
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
}

function Avatar({ hash }) {
  let url = `https://www.gravatar.com/avatar/${hash}`;
  return <img src={url} className="avatar" alt="avatar" />;
}

function Message({ text }) {
  return <div className="message">{text}</div>;
}

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <div className="name-with-handle">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </div>
  );
}

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return <span className="time">{timeString}</span>;
};
const ReplyButton = () => <i className="fa fa-reply reply-button" />;
const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    {getRetweetCount({ count })}
  </span>
);
const LikeButton = ({ count }) => (
  <span className="like-button">
    <i className="fa fa-heart" />
    {count > 0 && <span className="like-count">{count}</span>}
  </span>
);
const MoreOptionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);

function getRetweetCount({ count }) {
  if (count > 0) {
    return <span className="retweet-count">{count}</span>;
  } else {
    return null;
  }
}

// fake tweet
var testTweet = {
  message: "Something about cats.",
  gravatar: "203b188f73fbb03d3b0b99c42f3dedcf",
  author: {
    handle: "catperson",
    name: "IAMA Cat Person",
  },
  likes: 20,
  retweets: 10,
  timestamp: "2018-07-30 21:24:37",
};
// PropTypes
LikeButton.propTypes = {
  count: PropTypes.number,
};
RetweetButton.propTypes = {
  count: PropTypes.number,
};
Message.propTypes = {
  text: PropTypes.string,
};
Time.propTypes = {
  time: PropTypes.string,
};
NameWithHandle.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
  }).isRequired,
};
Avatar.propTypes = {
  hash: PropTypes.string.isRequired,
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    gravatar: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    timestamp: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    retweets: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector("#root"));
