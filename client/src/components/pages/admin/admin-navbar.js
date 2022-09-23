import React, { useEffect, useState } from "react";
import "./admin-navbar.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let [click, setClick] = useState(true);
  let [numberOfMessages, setNumberOfMessages] = useState(null);
  let [messagesArray, setMessagesArray] = useState([]);
  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/login");
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/contact").then((response) => {
      console.log(response.data);
      setMessagesArray(response.data);
      const unReadMessages = messagesArray.filter((item) => {
        if (item.status === "unread") {
          console.log(item.status);
          return true;
        } else {
          return false;
        }
      });
      setNumberOfMessages(unReadMessages.length);
    });
  }, [numberOfMessages]);

  //setNumberOfMessages(unReadMessages.length);
  console.log(numberOfMessages);

  function handleClick() {
    setClick((preValue) => {
      return !preValue;
    });
  }
  return (
    <div id="admin-navigationbar">
      <div className="admin-navigationbar">
        <Link className="dashboard-link" to="/admin">
          <img alt="img" src="./images/dashboard.png" />
          <h1>Dashboard</h1>
        </Link>

        <div className="admin-navbar-container">
          <p className="welcome-name">Welcome Jacone</p>
          <Link to="/messages">
            <p className="admin-navbar-messages">
              Message(s) <span>{numberOfMessages}</span>
            </p>
          </Link>

          <button onClick={logOut}>Log Out</button>

          <div onClick={handleClick} className="admin-navbar-menu-icon">
            {click ? (
              <img
                className="admin-navbar-humburger-icon"
                alt="icon"
                src="./images/menu2.png"
              />
            ) : (
              <img
                className="admin-navbar-close-icon"
                alt="icon"
                src="./images/close2.png "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
