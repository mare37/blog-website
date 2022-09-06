import React, { useEffect, useState } from "react";
import "./addproject.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

Axios.defaults.withCredentials = true;

function UpdateProject() {
  const { postId } = useParams();
  let navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:8080/project/${postId}`).then((response) => {
      console.log(response.data);
      setProjectTitle(response.data[0].nameOfProject);
      setProjectDescription(response.data[0].projectDescription);
    });
  }, []);

  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  const update = () => {
    Axios.put(`http://localhost:8080/project/${postId}`, {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
    }).then((response) => {
      console.log(response);
      alert("Project Updated succesfully!");
      navigate("/articlesandprojects");
    });
  };

  return (
    <div>
      <div className="admin">
        <div className="side-bar">
          <Link to="/" target="_blank">
            <img className="home" src="./images/home2.png" />
            <p className="hide">Home</p>
          </Link>

          <Link to="/blog" target="_blank">
            <img className="blog-icon" src="./images/symbols.png" />
            <p className="hide">Blog</p>
          </Link>

          <Link to="/createblog" target="_blank">
            <img src="./images/content-writing.png" />
          </Link>

          <Link to="" target="_blank">
            <img src="./images/project.png" />
          </Link>
        </div>
        <div className="main-bar">
          <div className="navigation-bar">
            <div>
              <img src="./images/dashboard.png" />
              <h1>Dashboard</h1>
            </div>

            <button onClick={logOut}>Log Out</button>
          </div>
          <div className="main-content">
            <input
              value={projectTitle}
              type="text"
              placeholder="Project Name"
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
            <textarea
              value={projectDescription}
              placeholder="Description"
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
            <button onClick={update}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
