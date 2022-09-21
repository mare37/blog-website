import React from "react";

const MessageElement = (props) => {
  return (
    <div className="messagesElement">
      <p className="messages-sender-name">{props.fullName}</p>
      <p className="messages-sender-message">{props.message}</p>
      <p className="messages-date">Date</p>
    </div>
  );
};

export default MessageElement;
