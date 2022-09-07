//import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import Axios from "axios";
import "./login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import schema from "./formValidation";

import { useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function LogIn() {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const Form = () => {
    const { register, handleSubmit } = useForm({
      resolver: yupResolver(schema),
    });
  };

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
      <form onSubmit={submitInfo} className="login-container">
        <label>Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          type="text"
          name="email"
          placeholder="Email"
        />
        <label>Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
