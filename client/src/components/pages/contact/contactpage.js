import React, { useState, useRef, useEffect } from "react";
import "./contactpage.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Navbar from "../../Home/Navbar/navbar";
import ReCAPTCHA from "react-google-recaptcha";
import site from "../../../site";
import AOS from "aos";
import "aos/dist/aos.css";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  message: yup.string().required(),
});

Axios.defaults.withCredentials = true;

function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [submitButton, setSubmitButton] = useState(false);
  const [recaptcha, setRecaptcha] = useState(true);
  const [messageSent, setMessageSent] = useState(false);

  const captchaRef = useRef(null);

  const verify = () => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (token) {
      setSubmitButton(true);
      setRecaptcha(false);
    }
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    //console.log(data);

    Axios.post(`/api/contact`, {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
      status: "unread",
      dateAndTime: {
        date: new Date().toLocaleDateString("en-uk", options),
        time: new Date().toLocaleTimeString(),
      },
    }).then((response) => {
      //window.location.reload();
      setMessageSent(true);

      console.log(response);
      // alert("MESSAGE SENT SUCCESSFULLY!");
    });
  };

  return (
    <>
      <Navbar />
      <div id="contact-page">
        <div className="contact-text">
          <h1>Let’s get in touch!</h1>
          <p>
            Have a project in mind? Fill in the form and we’ll get in touch with
            you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="contact-form"
        >
          <input placeholder="Full Name" {...register("fullName")} />
          {errors.fullName && (
            <p className="contact-error">Please enter a valid name</p>
          )}
          <input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="contact-error">Please enter a valid email</p>
          )}

          <input placeholder="Phone Number" {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <p className="contact-error">Please enter a valid phone number</p>
          )}
          <input placeholder="Message" {...register("message")} />
          {errors.message && (
            <p className="contact-error">Please enter a valid message</p>
          )}

          {messageSent ? <div>MESSAGE SENT SUCCESSFULLY</div> : ""}

        

            <button type="submit">
              Submit
            </button>

        
        </form>
      </div>
    </>
  );
}

export default ContactPage;
