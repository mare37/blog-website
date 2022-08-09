import React from "react";
import "./projects.css";

function Project(props) {
  return (
    <div className="project">
      <section className="content">
        <h1 className="content-heading">{props.heading1}</h1>
        <h3 className="content-subheading">{props.heading2}</h3>
        <p>{props.body}</p>
      </section>
      <section
        className="image"
        style={{
          backgroundImage: `url(./images/project.jpg)`,
          backgroundSize: "cover",
        }}
      ></section>
    </div>
  );
}

export default Project;
