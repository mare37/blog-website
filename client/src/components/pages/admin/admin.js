import React from "react";
import "./admin.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Axios.defaults.withCredentials = true;

function Admin() {
  let navigate = useNavigate();
  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <div>
      <div className="admin">
        <div className="side-bar">
          <Link to="/" target="_blank">
            <img className="home" src="./images/home2.png" />
            <p className="hide">Home</p>
          </Link>

          <Link to="/blog" target="_blank">
            <img className="blog-icon" src="./images/symbols.png" />
            <p className="hide">Blog</p>
          </Link>

          <Link to="/createblog" target="_blank">
            <img src="./images/content-writing.png" />
          </Link>

          <Link to="/addproject" target="_blank">
            <img src="./images/project.png" />
          </Link>
        </div>
        <div className="main-bar">
          <div className="navigation-bar">
            <div>
              <img src="./images/dashboard.png" />
              <h1>Dashboard</h1>
            </div>

            <button onClick={logOut}>Log Out</button>
          </div>

          <div className="main-content">
            <div className="content-container">
              <div>
                <h2>No. Of Articles </h2>
                <h3>2</h3>
              </div>
              <div>
                <h2>No. Of Projects </h2>
                <h3>2</h3>
              </div>
              <div>
                <h2>No. Of Visitors </h2>
                <h3>2</h3>
              </div>
            </div>
            <div className="content-container2">
              <div>
                <h2>Recent Articles</h2>
                <h4>1 How to make a car like...</h4>
                <h4>2 How to make a car like...</h4>
                <h4>3 How to make a car like...</h4>
              </div>
              <div>
                <h2>Recent Projects</h2>
                <h4>1 How to make a car like...</h4>
                <h4>2 How to make a car like...</h4>
                <h4>3 How to make a car like...</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
