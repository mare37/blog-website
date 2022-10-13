import React from "react";
import "./projects.css";
import Project from "./project";
import { useNavigate } from "react-router-dom";

//Data being drawn from the Homepage component!
function Projects(props) {
  const navigate = useNavigate();
  let data = props.projectsData.map((dataItem, index) => {
    return (
      <Project
        key={index}
        id={dataItem.idprojects}
        heading1={"Case Study"}
        heading2={dataItem.nameOfProject}
        body={dataItem.projectDescription}
      />
    );
  });

  return (
    <div id="projects">
      <h1 className="main-heading">
        RECENT <span>PROJECTS</span>
      </h1>
      {data}
      <button
        onClick={() => {
          navigate("/projectlist");
        }}
        className="more-case-studies"
      >
        More Case Studies
      </button>
    </div>
  );
}

export default Projects;
