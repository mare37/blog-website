import React from "react";
import "./projects.css";
import Project from "./project";
import projectsData from "../../projectsdata";

function Projects(props) {
  let data = props.projectsData.map((dataItem) => {
    return (
      <Project
        key={dataItem.idprojects}
        heading1={"Project"}
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
    </div>
  );
}

export default Projects;
