import React, { useEffect, useState } from "react";

import "./articlesAndprojects.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Axios.defaults.withCredentials = true;

const BlogPostsElement = (props) => {
  return (
    <div className="element-container">
      <p className="element-id">{props.id}</p>
      <p className="element-title">{props.title}</p>
      <p className="element-date">{props.date}</p>
      <div className="element-buttons">
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

const ProjectsElement = (props) => {
  return (
    <div className="element-container">
      <p className="element-id">{props.id}</p>
      <p className="element-title">{props.nameOfProject}</p>
      <p className="element-description">{props.description}</p>
      <div className="element-buttons">
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

function ArticlesAndProjects() {
  let navigate = useNavigate();

  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Getting blog posts from the backend
    Axios.get("http://localhost:8080/blogpost").then((response) => {
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
              <p className="heading-id">ID</p>
              <p className="heading-title">Title</p>
              <p className="heading-date">Date</p>
            </div>
            <div className="blogposts">{blogPostsData}</div>
            <br />
            <br />
            <br />
            <br />
            <div className="headings-container">
              <p className="heading-id">ID</p>
              <p className="heading-title">Project Name</p>
              <p className="heading-date">Description</p>
            </div>
            <div className="blogposts">{projectsData}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesAndProjects;
