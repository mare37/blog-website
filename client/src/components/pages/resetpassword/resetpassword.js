import React, { useEffect, useState } from "react";
import Axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./resetpassword.css";

Axios.defaults.withCredentials = true;

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

function ResetPassword() {
  const [link, setLink] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitInfo = (data) => {
    console.log(data.email);
    Axios.post("http://localhost:8080/api/forgotpassword", {
      email: data.email,
    }).then((response) => {
      //navigate("/admin");
      console.log(response.data);
    });
  };

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
        <p>Reset Password</p>

        <input placeholder="Enter Email" {...register("email")} />
        {errors.email && (
          <section className="login-error">Enter a valid email</section>
        )}

        <button
          onClick={() => {
            setLink(true);
          }}
          type="submit"
        >
          Submit
        </button>

        {link ? (
          <h3 className="reset-link">Reset Link Sent To Your Email</h3>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
