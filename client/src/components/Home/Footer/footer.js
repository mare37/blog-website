import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const date = new Date().getFullYear();

  return (
    <div id="footer">
      <div className="footer-container">
        <section className="footer-content">
          <h1>Jacon Keya</h1>
          <p className="footer-text">One stop shopforeverything nmachine</p>
        </section>
        <section className="footer-social-icons">
          <img src="./images/facebook.png" alt="img" />
          <img src="./images/instagram.png   " alt="img" />
          <img src=" ./images/twitter.png   " alt="img" />
        </section>
        <div className="footer-terms">
          <p>Terms And Conditions</p> <p>Private Policy</p>
        </div>
        <h6>All Rights Reserved {date} </h6>
      </div>
    </div>
  );
}

export default Footer;
