import React from "react";
import { Link } from "react-router-dom";
import "./admin-sidebar.css";

function SideBar() {
  return (
    <div>
      <div className="admin-sidebar">
        <Link className="image-wrap" to="/" target="">
          <img className="admin-sidebar-img" src="./images/home2.png" />
          <p class="sidebar-img__description">Home</p>
        </Link>

        <Link className="image-wrap" to="/blog" target="">
          <img className="admin-sidebar-img" src="./images/symbols.png" />
          <p class="sidebar-img__description">Blog</p>
        </Link>

        <Link className="image-wrap" to="/createblog" target="_blank">
          <img
            className="admin-sidebar-img"
            src="./images/content-writing.png"
          />
          <p class="sidebar-img__description">Write post</p>
        </Link>

        <Link className="image-wrap" to="/addproject" target="_blank">
          <img className="admin-sidebar-img" src="./images/project2.png" />
          <p class="sidebar-img__description">Add Project</p>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
