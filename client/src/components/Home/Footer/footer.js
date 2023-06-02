import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Footer() {
  const navigate = useNavigate();
  const date = new Date().getFullYear();

  return (
    <div id="footer">
      <div className="footer-container">
        <section className="footer-content">
          <h1>Jacon Keya</h1>
          <p className="footer-text">Everything Machine Learning</p>
        </section>
        <section className="footer-social-icons">
          <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
            <img src="./images/facebook.png" alt="img" />
          </a>
          <a href="https://instagram.com" target={"_blank"} rel="noreferrer">
            <img src="./images/instagram.png" alt="img" />
          </a>
          <a href="https://twitter.com" target={"_blank"} rel="noreferrer">
            <img src=" ./images/twitter.png" alt="img" />
          </a>
          <a href="https://linkedin.com" target={"_blank"} rel="noreferrer">
            <img src=" ./images/linkedin.png" alt="img" />
          </a>
          <a href="https://github.com" target={"_blank"} rel="noreferrer">
            <img src=" ./images/github.png" alt="img" />
          </a>
        </section>
        <div className="footer-terms">
          <p
            onClick={() => {
              navigate("/termsandconditions");
            }}
          >
            Terms And Conditions
          </p>

          <HashLink
            className="private-policy"
            to="/termsandconditions#private-policy"
          >
            <p>Private Policy</p>
          </HashLink>
        </div>
        <h6>All Rights Reserved {date} </h6>
      </div>
    </div>
  );
}

export default Footer;
