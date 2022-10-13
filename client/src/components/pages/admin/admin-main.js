import React, { useEffect, useState } from "react";
import "./admin-main.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SideBar from "./admin-sidebar";

function Main() {
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
    if (item.title.length > 30) {
      title = item.title.substring(0, 30) + "...";
    }
    return (
      <p
        className="blogpost-preview"
        key={key}
        onClick={() => {
          navigate(`/post/${item.id}`);
        }}
      >
        <span>{`\u2022`}</span>
        {title}
      </p>
    );
  });

  let projectsData = projects.map((item, key) => {
    let projectName = item.nameOfProject;
    if (projectName.length > 30) {
      projectName = projectName.substring(0, 30) + "...";
    }
    return (
      <p
        key={key}
        className="blogpost-preview"
        onClick={() => {
          navigate(`/projects/${item.idprojects}`);
        }}
      >
        {projectName}
      </p>
    );
  });

  return (
    <div id="admin-mainbar">
      <div>
        <div className="admin-maincontent">
          <div className="admin-contentcontainer">
            <div>
              <HashLink to="/articlesandprojects#postsAndprojects-heading-1">
                <span>{`>>`}</span>
              </HashLink>

              <section>
                <p>BLOG POSTS </p>
                <h3>{numberOfBlogPosts}</h3>
              </section>
            </div>
            <div>
              <HashLink to="/articlesandprojects#postsAndprojects-heading-2">
                <span>{`>>`}</span>
              </HashLink>
              <section>
                <p>PROJECTS</p>
                <h3>{numberOfProjects}</h3>
              </section>
            </div>
            <div>
              <span>{`>>`}</span>
              <section>
                <p>WEBSITE VISITORS</p>
                <h3>2</h3>
              </section>
            </div>
          </div>
          <div className="admin-contentcontainer2">
            <div>
              <section>
                <p className="admin-blogpostpreview-headings">
                  RECENT BLOG POSTS
                </p>
                {blogPostsData}
              </section>

              <section className="admin-preview-button">
                <button
                  onClick={() => {
                    navigate("/articlesandprojects");
                  }}
                >
                  All Articles
                </button>
              </section>
            </div>
            <div>
              <section>
                <p className="admin-blogpostpreview-headings">
                  RECENT PROJECTS
                </p>
                {projects.length === 0 ? "No recent projects" : projectsData}
              </section>

              <section className="admin-preview-button">
                <button
                  onClick={() => {
                    navigate("/articlesandprojects");
                  }}
                >
                  All Projects
                </button>
              </section>
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default Main;
