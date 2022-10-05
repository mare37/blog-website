import React from "react";
import "./contactpage.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Axios from "axios";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  message: yup.string().required(),
});

Axios.defaults.withCredentials = true;

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    //console.log(data);

    Axios.post("http://localhost:8080/contact", {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
      status: "unread",
    }).then((response) => {
      //window.location.reload();

      console.log(response);
      // alert("MESSAGE SENT SUCCESSFULLY!");
    });
  };

  return (
    <div id="contact-page">
      <div className="contact-text">
        <h1>Let’s get in touch!</h1>
        <p>
          Have a project in mind? Fill in the form and we’ll get in touch with
          you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="contact-form">
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;
