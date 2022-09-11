import React from "react";
import "./about.css";

function About() {
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
          <button className="button">Download Resume</button>
        </section>
        <section className="image-container">
          <img className="about-image" src="./images/developer.jpg" alt="img" />
        </section>
      </div>
    </div>
  );
}

export default About;
