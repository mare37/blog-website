import React, { useEffect, useState } from "react";
import "./admin-navbar.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import site from "../../../site";

function Navbar() {
  const navigate = useNavigate();
  let [click, setClick] = useState(true);
  let [numberOfMessages, setNumberOfMessages] = useState(null);
  let [messagesArray, setMessagesArray] = useState([]);
  let [clickDropMenu, setclickDropMenu] = useState(false);

  const logOut = () => {
    Axios.get(`http://${site.hostname}:${site.port}/api/logout`).then(
      (response) => {
        console.log(response);
        navigate("/login");
      }
    );
  };

  useEffect(() => {
    Axios.get(`http://${site.hostname}:${site.port}/contact`).then(
      (response) => {
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
      }
    );
  }, [numberOfMessages]);

  //setNumberOfMessages(unReadMessages.length);
  console.log(numberOfMessages);

  function handleClick() {
    setClick((preValue) => {
      return !preValue;
    });
  }
  const handleDropMenuClick = () => {
    setclickDropMenu((preValue) => {
      return !preValue;
    });
  };
  return (
    <div id="admin-navigationbar">
      <div className="admin-navigationbar">
        <Link className="dashboard-link" to="/admin">
          <img alt="img" src="./images/dashboard.png" />
          <h1>Dashboard</h1>
        </Link>

        <div className="admin-navbar-container">
          <div className="admin-navbar-bar ">
            <div className="admin-navbar-welcomename">
              <p>Welcome Jacon!</p>
              <img
                onClick={handleDropMenuClick}
                src="./images/down-arrow.png"
                alt="image"
              />
            </div>

            <div
              className={
                clickDropMenu
                  ? "admin-navbar-options"
                  : "admin-navbar-options active"
              }
            >
              <Link to="/changepassword">
                <p>Change Password</p>
              </Link>

              <HashLink to="/changepassword#upload-picture">
                <p>Upload Photo</p>
              </HashLink>
              <HashLink to="/changepassword#upload-resume">
                <p>Upload Resume</p>
              </HashLink>
            </div>
          </div>

          <Link to="/messages">
            <p className="admin-navbar-messages">
              Message(s) <span>{numberOfMessages}</span>
            </p>
          </Link>

          <ul
            onClick={handleClick}
            className={
              click ? "admin-unorder-list" : "admin-unorder-list active"
            }
          >
            <li>
              <HashLink className="admin-list-item" to="/admin">
                DASHBOARD
              </HashLink>
            </li>
            <li>
              <Link className="admin-list-item" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="admin-list-item" to="/blog">
                BLOG
              </Link>
            </li>

            <li>
              <HashLink className="admin-list-item" to="/articlesandprojects">
                BLOG POSTS & PROJECTS
              </HashLink>
            </li>
          </ul>

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
