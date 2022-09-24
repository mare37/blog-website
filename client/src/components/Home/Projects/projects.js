import React from "react";
import "./projects.css";
import Project from "./project";

//Data being drawn from the Homepage component!
function Projects(props) {
  let data = props.projectsData
    .slice(0)
    .reverse()
    .map((dataItem) => {
      return (
        <Project
          key={dataItem.idprojects}
          id={dataItem.idprojects}
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
