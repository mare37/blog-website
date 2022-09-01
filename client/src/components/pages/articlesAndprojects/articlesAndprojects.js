import React, { useEffect, useState } from "react";

import "./articlesAndprojects.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { BlogPostsElement, ProjectsElement } from "./elements";

Axios.defaults.withCredentials = true;

//------------------------------------------------------------------------------------

function ArticlesAndProjects() {
  let navigate = useNavigate();

  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [confirmationPage, setConfirmationPage] = useState(false);
  const [id, setId] = useState(null);

  //-------------------------------------------------------------

  //--------------------------------------------------------------------

  useEffect(() => {
    // Getting blog posts from the backend
    Axios.get("http://localhost:8080/blogpost", {}).then((response) => {
      //console.log(response.data);
      setBlogPosts(response.data);
    });
    //Getting number of projects from the backend
    Axios.get("http://localhost:8080/project").then((response) => {
      setProjects(response.data);
    });
  }, []);

  let blogPostsData = blogPosts.map((item, key) => {
    let title = item.title;
    if (item.title.length > 80) {
      title = item.title.substring(0, 80) + "...";
    }
    return (
      <BlogPostsElement key={key} id={item.id} title={title} date={item.date} />
    );
  });

  let projectsData = projects.map((item, key) => {
    let projectName = item.nameOfProject;
    if (projectName.length > 20) {
      projectName = projectName.substring(0, 20) + "...";
    }
    return (
      <ProjectsElement
        key={key}
        id={item.idprojects}
        nameOfProject={item.nameOfProject}
        description={item.projectDescription}
      />
    );
  });

  const logOut = () => {
    Axios.get("http://localhost:8080/api/logout").then((response) => {
      console.log(response);
      navigate("/");
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

          <Link to="/addproject" target="_blank">
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
            <div className="headings-container">
              <p className="heading-id">Id</p>
              <p className="heading-title">Title</p>
              <p className="heading-date">Date</p>
            </div>
            <div className="blogposts">
              {blogPosts.length === 0 ? "No posts to show" : blogPostsData}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="headings-container">
              <p className="heading-id">Id</p>
              <p className="heading-title">Project Name</p>
              <p className="heading-date">Description</p>
            </div>
            <div className="blogposts">
              {projects.length === 0 ? "No projects to show" : projectsData}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesAndProjects;
