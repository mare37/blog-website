import React from "react";
import "./contactpage.css";

function ContactPage() {
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

      <form className="contact-form">
        <div>
          <input placeholder="Full Name" /> <input placeholder="Email" />
        </div>
        <div>
          <input placeholder="Phone Number" /> <input placeholder="Message" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;
