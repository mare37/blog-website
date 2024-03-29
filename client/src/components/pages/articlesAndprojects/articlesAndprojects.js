import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./articlesAndprojects.css";
import Axios from "axios";

import { BlogPostsElement, ProjectsElement } from "./elements";
import NavBar from "../admin/admin-navbar";
import SideBar from "../admin/admin-sidebar";
import site from "../../../site";

Axios.defaults.withCredentials = true;

function ArticlesAndProjects() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectOrPost, setProjectOrPost] = useState(true);

  const handleClickSetBlogPosts = () => {
    setProjectOrPost(true);
  };

  const handleClickSetProjects = () => {
    setProjectOrPost(false);
  };

  useEffect(() => {
    // Getting blog posts from the backend

    //`/api/blogpost`
    Axios.get(`/api/blogpost`, {}).then(
      (response) => {
        console.log(response.data);
        setBlogPosts(response.data);
      }
    );
    //Getting number of projects from the backend

    //`/api/project`
    Axios.get(`/api/project`).then(
      (response) => {
        console.log(response.data);
        setProjects(response.data);
      }
    );
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
          id={item.posts_id}
          title={title}
          date={item.date}
          time={item.time}
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
          id={item.projects_id}
          nameOfProject={item.nameOfProject}
          date={item.date}
          time={item.time}
        />
      );
    });

  return (
    <div>
      <div className="admin">
        <NavBar />
        <div className="main-bar">
          <div className="main-content">
            <Link to={"/admin"}>
              <p className="back-to-dashboard">Back to Dashboard</p>
            </Link>

            <div className="postsAndprojects-heading">
              <button
                className={projectOrPost ? "active" : ""}
                onClick={handleClickSetBlogPosts}
              >
                All Blog Posts
              </button>
              <button
                className={projectOrPost ? "" : "active"}
                onClick={handleClickSetProjects}
              >
                All Projects
              </button>
            </div>
            {projectOrPost ? (
              <div className="blogposts">
                <div id="element-container2">
                  <div className="element-container2">
                    <p className="element-id">Id</p>
                    <p className="element-title">Post</p>
                    <p className="date-and-buttons">Created</p>
                  </div>
                </div>

                {blogPosts.length === 0 ? (
                  <p className="messages-inbox-empty">No Posts</p>
                ) : (
                  blogPostsData
                )}
              </div>
            ) : (
              <div className={"blogposts"}>
                <div className="element-container2">
                  <p className="element-id">Id</p>
                  <p className="element-title">Project</p>
                  <p className="date-and-buttons">Created</p>
                </div>
                {projects.length === 0 ? (
                  <p className="messages-inbox-empty">No projects</p>
                ) : (
                  projectsData
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default ArticlesAndProjects;
