import React from "react";
import "./contactinfo.css";

function ContactInfo() {
  return (
    <div id="contact">
      <div className="contact-container">
        <section className="contact-main-heading">
          <h1>
            CONTACT <span>INFO</span>
          </h1>
        </section>
        <div className="contact-item-container">
          <section className="contact-item">
            <img className="contact-image" src="./images/phone.png" alt="img" />

            <h2 className="contact-h2">Phone</h2>
            <h3 className="contact-h3">0728883905</h3>
          </section>
          <section className="contact-item">
            <img className="contact-image" src="./images/email.png" alt="img" />

            <h2 className="contact-h2">Email</h2>
            <h3 className="contact-h3">marewilson35@gmail.com</h3>
          </section>
          <section className="contact-item">
            <img
              className="contact-image"
              src="./images/address.png"
              alt="img"
            />

            <h2 className="contact-h2">Address</h2>
            <h3 className="contact-h3">Nairobi, Kenya</h3>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
