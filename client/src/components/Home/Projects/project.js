import React, { useEffect } from "react";
import "./projects.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Project(props) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div
      onClick={() => {
        navigate(`/project/${props.id}`);
      }}
      className="project"
      data-aos="fade-up"
    >
      <section className="content">
        <h1 className="content-heading">{props.heading1}</h1>
        <h3 className="content-subheading">
          {props.heading2.length > 30
            ? props.heading2.substring(0, 30) + "..."
            : props.heading2}
        </h3>
        <p>
          {props.body.length > 200
            ? props.body.substring(0, 200) + "...Read More"
            : props.body}
        </p>
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
