import React, { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../admin/admin-navbar";
import SideBar from "../admin/admin-sidebar";
//import MessageElement from "./messagesElements";

import "./messages.css";

function Messages() {
  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesTab, setMessagesTab] = useState(true);
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const reloadContacts = () => {
    Axios.get("http://localhost:8080/contact").then((response) => {
      setMessagesArray(response.data);
      setNumberOfMessages(response.data.length);
    });
  };

  const handleReadStatus = (id) => {
    Axios.put("http://localhost:8080/contact", {
      id: id,
    });
  };

  const handleDeleteAll = () => {
    Axios({
      method: "delete",
      url: "http://localhost:8080/contact",
    }).then((response) => {
      console.log(response.data);
    });
    window.location.reload();
  };

  const handleDelete = (id) => {
    console.log(id);
    Axios({
      method: "delete",
      url: `http://localhost:8080/contact/${id}`,
      header: "application/json",
    }).then((response) => {
      console.log(response.data);
    });
    window.location.reload();
  };

  const MessageElement = (props) => {
    return (
      <div
        className={props.status ? "messagesElement active" : "messagesElement"}
      >
        <div
          onClick={() => {
            setMessagesTab(false);
            setInfo(() => {
              return {
                fullName: props.fullName,
                email: props.email,
                phoneNumber: props.phoneNumber,
                message: props.message2,
              };
            });
            handleReadStatus(props.id);
          }}
          className="messages-information-container"
        >
          <p className="messages-sender-name">{props.fullName}</p>
          <p className="messages-sender-message">{props.message}</p>
          <p className="messages-date">04/08/2022</p>
        </div>

        <div className="messages-delete">
          <button
            onClick={() => {
              handleDelete(props.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/contact").then((response) => {
      setMessagesArray(response.data);
      setNumberOfMessages(response.data.length);
    });
  }, []);

  let messagesData = messagesArray
    .slice(0)
    .reverse()
    .map((item, key) => {
      let readStatus;
      if (item.status === "unread") {
        readStatus = true;
      }
      return (
        <MessageElement
          key={key}
          id={item.idcontactinfo}
          fullName={item.fullname}
          email={item.email}
          phoneNumber={item.phonenumber}
          message={
            item.message.length > 50
              ? item.message.slice(0, 50) + "..."
              : item.message
          }
          message2={item.message}
          status={readStatus}
        />
      );
    });

  return (
    <div>
      <div className="messages">
        <Navbar />
        {messagesTab ? (
          <div className="messages-container">
            <div className="messages-inner-container">
              <div className="messages-heading">
                <div className="messages-information-container">
                  <p className="messages-sender-name">Sender Name</p>
                  <p className="messages-sender-message">Message</p>
                  <p className="messages-date">Date</p>
                </div>

                <div className="messages-delete">
                  <button onClick={handleDeleteAll}>Delete All Messages</button>
                </div>
              </div>
              {numberOfMessages !== 0 ? (
                messagesData
              ) : (
                <p className="messages-inbox-empty">Inbox Empty</p>
              )}
            </div>
          </div>
        ) : (
          <div className="messages-container">
            <div className="messages-inner-container2">
              <p className="messages-inner-container2-name">
                {info.fullName}{" "}
                <img
                  onClick={() => {
                    setMessagesTab(true);
                    reloadContacts();
                  }}
                  alt="image"
                  src="./images/close.png"
                />
              </p>
              <p>{info.email}</p>
              <p>{info.phoneNumber}</p>
              <p>{info.message}</p>
            </div>
          </div>
        )}

        <SideBar />
      </div>
    </div>
  );
}

export default Messages;
