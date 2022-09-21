import React, { useEffect, useState } from "react";
import Navbar from "../admin/admin-navbar";
import SideBar from "../admin/admin-sidebar";
import MessageElement from "./messagesElements";
import Axios from "axios";
import "./messages.css";

function Messages() {
  const [messagesArray, setMessagesArray] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/contact").then((response) => {
      setMessagesArray(response.data);
    });
  }, []);
  console.log(messagesArray);

  let messagesData = messagesArray.map((item, key) => {
    return (
      <MessageElement
        key={key}
        fullName={item.fullname}
        email={item.email}
        phoneNumber={item.phonenumber}
        message={item.message}
      />
    );
  });
  // console.log(messagesData);

  return (
    <div>
      <div className="messages">
        <Navbar />
        <div className="messages-container">
          <div className="messages-inner-container">
            <div className="messages-heading">
              <p className="messages-sender-name">Sender Name</p>
              <p className="messages-sender-message">Message</p>
              <p className="messages-date">Date</p>
            </div>
            {messagesData}
          </div>
        </div>

        <SideBar />
      </div>
    </div>
  );
}

export default Messages;
