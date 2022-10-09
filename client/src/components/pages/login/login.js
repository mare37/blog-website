//import axios, { Axios } from "axios";
import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import "./login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./formValidation";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

Axios.defaults.withCredentials = true;

function LogIn() {
  const [submitButton, setSubmitButton] = useState(true);
  const [recaptcha, setRecaptcha] = useState(false);

  let navigate = useNavigate();
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const verify = () => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (token) {
      //setSubmitButton(true);
      //setRecaptcha(false);
    }
  };

  const submitInfo = (data) => {
    Axios.post("http://localhost:8080/api/login", {
      email: data.email,
      password: data.password,
    }).then((response) => {
      navigate("/admin");
      console.log(response.data);
    });
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
    <div
      style={{
        backgroundImage: `url(./images/computer3.jpg)`,
        backgroundSize: "cover",
        position: "relative",
        zIndex: 1,
      }}
      id="login"
    >
      <form onSubmit={handleSubmit(submitInfo)} className="login-container">
        <p>Login</p>

        <input placeholder="Enter Email" {...register("email")} />
        {errors.email && (
          <section className="login-error">Enter a valid email</section>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <section className="login-error">Password not valid</section>
        )}
        <br />

        {recaptcha ? (
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            ref={captchaRef}
            onChange={verify}
          />
        ) : (
          ""
        )}

        {submitButton ? <button type="submit">Submit</button> : ""}

        <div
          onClick={() => {
            navigate("/resetpassword");
          }}
          className="login-forgotpassword"
        >
          Forgot Password
        </div>
      </form>
    </div>
  );
}

export default LogIn;
