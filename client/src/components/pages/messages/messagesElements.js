import React from "react";
import { useNavigate } from "react-router-dom";

const MessageElement = (props) => {
  const navigate = useNavigate();
  return (
    <div className="messagesElement">
      <p className="messages-sender-name">{props.fullName}</p>
      <p className="messages-sender-message">{props.message}</p>
      <p className="messages-date">Date</p>
    </div>
  );
};

export default MessageElement;
