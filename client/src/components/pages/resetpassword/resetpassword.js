import React, { useState, useRef } from "react";
import Axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./resetpassword.css";
import ReCAPTCHA from "react-google-recaptcha";

Axios.defaults.withCredentials = true;

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

function ResetPassword() {
  const [link, setLink] = useState(false);
  const [input, setInput] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [recaptcha, setRecaptcha] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const captchaRef = useRef(null);

  const verify = () => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (token) {
      setSubmitButton(true);
      setRecaptcha(false);
    }
  };

  const submitInfo = (data) => {
    console.log(data.email);
    setSubmitButton(false);

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

        {input ? (
          <input placeholder="Enter Email" {...register("email")} />
        ) : (
          ""
        )}

        {errors.email && (
          <section className="login-error">Enter a valid email</section>
        )}

        {recaptcha ? (
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            ref={captchaRef}
            onChange={verify}
          />
        ) : (
          ""
        )}

        {submitButton ? (
          <button
            onClick={() => {
              setLink(true);
              setInput(false);
            }}
            type="submit"
          >
            Submit
          </button>
        ) : (
          ""
        )}
        {link ? (
          <div className="reset-link"> RESET LINK SENT TO YOUR EMAIL</div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
