//import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import Axios from "axios";
import "./login.css";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import { Navigate, useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function LogIn() {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [page, setPage] = React.useState(true);

  // const cookieKey = "token";
  const submitInfo = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:8080/api/login", {
      email: email,
      password: password,
    }).then((response) => {
      // bake_cookie("token", response.data.accessToken);

      navigate("/admin");

      console.log(response);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      }).then((response) => {
        bake_cookie("token", response.data.accessToken);
        if (response.data.auth) {
        }

        console.log(response.data.auth);
      });
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/api/login").then((response) => {
      //
      if (response.data.login) {
        console.log(response.data.login);
        console.log("CODE 1 RAN");
        navigate("/admin");
      }
      // console.log(isAuth);
    });
  }, []);

  return (
    <div>
      <form
        onSubmit={submitInfo}
        // onKeyDown={handleKeyDown}
        className="login-container"
      >
        <label>Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          type="text"
        />
        <label>Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
          type="text"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
