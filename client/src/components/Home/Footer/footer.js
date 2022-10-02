import React from "react";
import "./footer.css";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const date = new Date().getFullYear();

  const openLink = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;

    console.log(url);
  };

  return (
    <div id="footer">
      <div className="footer-container">
        <section className="footer-content">
          <h1>Jacon Keya</h1>
          <p className="footer-text">One stop shopforeverything nmachine</p>
        </section>
        <section className="footer-social-icons">
          <a href="https://facebook.com" target={"_blank"}>
            <img src="./images/facebook.png" alt="img" />
          </a>
          <a href="https://instagram.com" target={"_blank"}>
            <img src="./images/instagram.png" alt="img" />
          </a>
          <a href="https://twitter.com" target={"_blank"}>
            <img src=" ./images/twitter.png" alt="img" />
          </a>
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
