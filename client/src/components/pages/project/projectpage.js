import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
//CSS FROM BLOG PAGE blog.css
import Navbar from "../../Home/Navbar/navbar";

function ProjectPage() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    projectDescription: "",
  });

  useEffect(() => {
    Axios.get(`http://localhost:8080/project/${projectId}`).then((response) => {
      console.log(response.data[0]);
      setProjectInfo(() => {
        return {
          title: response.data[0].nameOfProject,
          projectDescription: response.data[0].projectDescription,
        };
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div id="post-background">
        <div className="post-header">
          <div>
            <h2>
              <span> AI </span> CASE STUDY
            </h2>
            <p>Latest artificial inteligence information</p>
          </div>
        </div>
        <div className="post-cont">
          <h2 className="post-title">{projectInfo.title}</h2>

          <div className="post-body">{projectInfo.projectDescription}</div>
        </div>

        <div className="post-subscribe-newsletter">
          <div className="post-subscribe-box">
            <input placeholder="Email" />
            <button>Subscribe To Our Newsletter</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
