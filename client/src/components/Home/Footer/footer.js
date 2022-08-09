import React from "react";
import "./footer.css";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <div id="footer">
      {" "}
      <div className="footer-container">
        <section className="footer-content">
          <h1>
            Jacon <span>Keya</span>{" "}
          </h1>{" "}
          <h3>Home of Machine Learning</h3>{" "}
        </section>
        <section className="footer-social-icons">
          <img src="./images/facebook.png" alt="img" />
          <img src="./images/instagram.png   " alt="img" />
          <img src=" ./images/twitter.png   " alt="img" />
        </section>
        <h6>All Rights Reserved {date} </h6>
      </div>
    </div>
  );
}

export default Footer;
