import React from "react";
import "./projects.css";
import { useNavigate } from "react-router-dom";

function Project(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/project/${props.id}`);
      }}
      className="project"
    >
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
