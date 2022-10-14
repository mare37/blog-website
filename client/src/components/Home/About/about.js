import React from "react";
import "./about.css";
import Axios from "axios";

import site from "../../../site";

Axios.defaults.withCredentials = true;

function About(props) {
  const downloadResume = () => {
    Axios.get(`http://${site.hostname}:${site.port}/resume`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="about2">
      <div id="about">
        <section className="text-container">
          <h1>
            ABOUT <span>ME</span>
          </h1>
          <h3>Machine Learning Expert</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised
          </p>
          <a href="http://localhost:8080/resume">
            <button className="button">Download Resume</button>
          </a>
        </section>
        <section className="image-container">
          <img className="about-image" src={`${props.image}`} alt="img" />
        </section>
      </div>
    </div>
  );
}

export default About;
