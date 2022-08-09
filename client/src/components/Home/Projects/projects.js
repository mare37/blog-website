import React from "react";
import "./projects.css";
import Project from "./project";
import projectsData from "../../projectsdata";

function Projects() {
  let data = projectsData.map((dataItem) => {
    return (
      <Project
        key={dataItem.id}
        heading1={dataItem.heading1}
        heading2={dataItem.heading2}
        body={dataItem.body}
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
