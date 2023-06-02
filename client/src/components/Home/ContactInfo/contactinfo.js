import React, { useEffect } from "react";
import "./contactinfo.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ContactInfo() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div id="contactInfo">
      <div className="contactInfo-container">
        <section  className="contactInfo-main-heading">
          <h1>
            CONTACT <span>INFO</span>
          </h1>
        </section>
        <div data-aos="fade-up" className="contactInfo-item-container">
          <section className="contactInfo-item">
            <img
              className="contactInfo-image"
              src="./images/phone.png"
              alt="img"
            />

            <h2 className="contactInfo-h2">Phone</h2>
            <h3 className="contactInfo-h3">0728883905</h3>
          </section>
          <section className="contactInfo-item">
            <img
              className="contactInfo-image"
              src="./images/email.png"
              alt="img"
            />

            <h2 className="contactInfo-h2">Email</h2>
            <h3 className="contactInfo-h3">marewilson35@gmail.com</h3>
          </section>
          <section className="contactInfo-item">
            <img
              className="contactInfo-image"
              src="./images/address.png"
              alt="img"
            />

            <h2 className="contactInfo-h2">Address</h2>
            <h3 className="contactInfoInfo-h3">Nairobi, Kenya</h3>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
