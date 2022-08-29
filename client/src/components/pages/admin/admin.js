import React, { useEffect, useState } from "react";
import "./admin.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Axios.defaults.withCredentials = true;

function Admin() {
  let navigate = useNavigate();
  const [numberOfBlogPosts, setNumberOfBlogPosts] = useState(null);
  const [numberOfProjects, setNumberOfProjects] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Getting number of articles from the backend
    Axios.get("http://localhost:8080/blogpost").then((response) => {
      setNumberOfBlogPosts(response.data.length);
      setBlogPosts(response.data.slice(0, 3));
    });
    //Getting number of projects from the backend
    Axios.get("http://localhost:8080/project").then((response) => {
      setNumberOfProjects(response.data.length);
      setProjects(response.data.slice(0, 3));
    });
  }, []);

  let blogPostsData = blogPosts.map((item, key) => {
    let title = item.title;
    if (item.title.length > 20) {
      title = item.title.substring(0, 20) + "...";
    }
    return <h4 key={key}>{`${item.id}  ${title}`}</h4>;
  });

  let projectsData = projects.map((item, key) => {
    let projectName = item.nameOfProject;
    if (projectName.length > 20) {
      projectName = projectName.substring(0, 20) + "...";
    }
    return <h4 key={key}>{`${item.idprojects}  ${projectName}`}</h4>;
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
            <div className="content-container">
              <div>
                <h2>No. Of Articles </h2>
                <h3>{numberOfBlogPosts}</h3>
              </div>
              <div>
                <h2>No. Of Projects </h2>
                <h3>{numberOfProjects}</h3>
              </div>
              <div>
                <h2>No. Of Visitors </h2>
                <h3>2</h3>
              </div>
            </div>
            <div className="content-container2">
              <div>
                <h2>Recent Articles</h2>
                {blogPostsData}
                <p
                  onClick={() => {
                    navigate("/articlesandprojects");
                  }}
                >
                  All Articles
                </p>
              </div>
              <div>
                <h2>Recent Projects</h2>
                {projectsData}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
