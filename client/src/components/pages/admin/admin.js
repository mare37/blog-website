import React, { useEffect, useState } from "react";
import "./admin.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./admin-navbar";
import SideBar from "./admin-sidebar";
import Main from "./admin-main";

Axios.defaults.withCredentials = true;

function Admin() {
  const navigate = useNavigate();
  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <div>
      <div className="admin">
        <Navbar />
        <Main />
      </div>
    </div>
  );
}

export default Admin;
