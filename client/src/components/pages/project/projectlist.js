import React, { useEffect, useState } from "react";
import "./projectlist.css";
import ProjectItem from "./projectItem";
import Axios from "axios";
//import Navbar from "../Home/Navbar/navbar";
import Navbar from "../../Home/Navbar/navbar";
import site from "../../../site";

Axios.defaults.withCredentials = true;

function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    Axios.get(`http://${site.hostname}:${site.port}/project`).then(
      (response) => {
        console.log(response.data);
        setProjects(response.data);
      }
    );
  }, []);

  let projectData = projects.map((item, key) => {
    return (
      <ProjectItem
        key={key}
        id={item.idprojects}
        nameOfProject={item.nameOfProject}
        projectDescription={item.projectDescription}
      />
    );
  });

  return (
    <>
      <Navbar />
      <div id="projectlist">
        <div
          style={{
            backgroundImage: "url(./images/blogimage.jpg)",
            backgroundSize: "cover",
            zIndex: "20",
            position: "relative",
            height: "250px",
            marginTop: "69px",
          }}
          className="projectList-image"
        >
          <p className="projectlist-top-heading">Case Studies</p>
        </div>
        <div className="projectlist-top-text">
          We always go the extra mile to deliver top-notch products for you.
          Have a look at some of our success cases!
        </div>
        <div className="projectlist">
          <div className="project-data-container">{projectData}</div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
