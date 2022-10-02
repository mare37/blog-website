import React, { useEffect, useState } from "react";

import "./articlesAndprojects.css";
import Axios from "axios";

import { BlogPostsElement, ProjectsElement } from "./elements";
import NavBar from "../admin/admin-navbar";
import SideBar from "../admin/admin-sidebar";

Axios.defaults.withCredentials = true;

function ArticlesAndProjects() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);

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

  let blogPostsData = blogPosts
    .slice(0)
    .reverse()
    .map((item, key) => {
      let title = item.title;
      if (item.title.length > 80) {
        title = item.title.substring(0, 80) + "...";
      }
      return (
        <BlogPostsElement
          key={key}
          id={item.id}
          title={title}
          date={item.date}
        />
      );
    });

  let projectsData = projects
    .slice(0)
    .reverse()
    .map((item, key) => {
      let projectName = item.nameOfProject;
      if (projectName.length > 20) {
        projectName = projectName.substring(0, 20) + "...";
      }
      return (
        <ProjectsElement
          key={key}
          id={item.idprojects}
          nameOfProject={item.nameOfProject}
          date={item.date}
        />
      );
    });

  return (
    <div>
      <div className="admin">
        <NavBar />
        <div className="main-bar">
          <div className="main-content">
            <div
              id="postsAndprojects-heading-1"
              className="postsAndprojects-heading"
            >
              <p className="adm-p1">Your Blog Posts</p>
              <p className="adm-p2">All blog posts you have in the database</p>
            </div>
            <div className="blogposts">
              <div id="element-container2">
                <div className="element-container2">
                  <p className="element-id">Id</p>
                  <p className="element-title">Blog Post Title</p>
                  <p className="date-and-buttons">Created</p>
                </div>
              </div>

              {blogPosts.length === 0 ? "No posts to show" : blogPostsData}
            </div>
            <div className="adm-buffer"></div>

            <div
              id="postsAndprojects-heading-2"
              className="postsAndprojects-heading"
            >
              <p className="adm-p1">Your Projects</p>
              <p className="adm-p2">All projects you have in the database</p>
            </div>
            <div className={"blogposts"}>
              <div className="element-container2">
                <p className="element-id">Id</p>
                <p className="element-title">Project</p>
                <p className="date-and-buttons">Created</p>
              </div>
              {projects.length === 0 ? (
                <p className="no-projects-posts">No projects to show </p>
              ) : (
                projectsData
              )}
            </div>
            <div className="adm-buffer"></div>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default ArticlesAndProjects;
