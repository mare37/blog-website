import React from "react";
import "./admin-navbar.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let [click, setClick] = React.useState(true);
  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };
  function handleClick() {
    setClick((preValue) => {
      return !preValue;
    });
  }
  return (
    <div id="admin-navigationbar">
      <div className="admin-navigationbar">
        <div>
          <img src="./images/dashboard.png" />
          <h1>Dashboard</h1>
        </div>

        <div className="admin-navbar-container">
          <p className="welcome-name">Welcome Jacone</p>

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
