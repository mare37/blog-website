import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
      admin
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Admin;
