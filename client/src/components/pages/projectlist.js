import React, { useEffect, useState } from "react";
import "./projectlist.css";
import ProjectItem from "./projectItem";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/projectlist").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  let projectData = projects.map((item, key) => {
    return (
      <ProjectItem
        key={key}
        nameOfProject={item.nameOfProject}
        projectDescription={item.projectDescription}
      />
    );
  });

  return (
    <>
      <div id="blog">
        <div className="blog">
          <div className="top-heading">
            <h1>Case Studies</h1>
            {projectData}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
