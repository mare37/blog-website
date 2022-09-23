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
      <div
        style={{
          backgroundImage: "url(./images/blogimage.jpg)",
          backgroundSize: "cover",
          zIndex: "20",
          position: "relative",
          marginTop: "90px",
          height: "250px",
        }}
        className="contact-image"
      ></div>

      <div className="contact-text">
        <h1>Let’s get in touch!</h1>
        <p>
          Have a project in mind? Fill in the form and we’ll get in touch with
          you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="contact-form">
        <div>
          <input placeholder="Full Name" {...register("fullName")} />
          {errors.fullName && <p>Not Valid</p>}
          <input placeholder="Email" {...register("email")} />
          {errors.email && <p>Not Valid</p>}
        </div>
        <div>
          <input placeholder="Phone Number" {...register("phoneNumber")} />
          {errors.phoneNumber && <p>Not Valid</p>}
          <input placeholder="Message" {...register("message")} />
          {errors.message && <p>Not Valid</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;
