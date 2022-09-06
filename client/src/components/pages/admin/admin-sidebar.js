import React from "react";
import { Link } from "react-router-dom";
import "./admin-sidebar.css";

function SideBar() {
  return (
    <div>
      <div className="admin-sidebar">
        <Link to="/" target="_blank">
          <img className="admin-home" src="./images/home2.png" />
        </Link>

        <Link to="/blog" target="_blank">
          <img className="admin-blogicon" src="./images/symbols.png" />
        </Link>

        <Link to="/createblog" target="_blank">
          <img src="./images/content-writing.png" />
        </Link>

        <Link to="/addproject" target="_blank">
          <img src="./images/project2.png" />
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
