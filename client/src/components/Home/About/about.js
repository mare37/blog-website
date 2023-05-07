import React, { useEffect } from "react";
import "./about.css";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import site from "../../../site";

Axios.defaults.withCredentials = true;

function About(props) {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  console.log(props.image);

  return (
    <div id="about2">
      <div id="about">
        <h1 data-aos="fade-up" className="about-me">
          ABOUT <span>ME</span>
        </h1>
        <div data-aos="fade-up" className="about-main-container">
          <section data-aos="fade-up" className="image-container">
            <img
              className="about-image"
              src={`./images/${props.image}`}
              alt="img"
            />
          </section>
          <section className="text-container">
            <h3 data-aos="fade-up"> Machine Learning Expert</h3>
            <p data-aos="fade-up">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised
            </p>
          </section>
        </div>
        <a href="http://localhost:3001/resume">
          <button data-aos="fade-up" className="about-button">
            Download Resume
          </button>
        </a>
      </div>
    </div>
  );
}

export default About;
