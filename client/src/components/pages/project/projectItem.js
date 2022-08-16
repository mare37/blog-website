import React from "react";
import "../blog/blog.css";
import { Navigate, useNavigate } from "react-router-dom";

function ProjectItem(props) {
  let navigate = useNavigate();
  return (
    <div className="blog-post">
      <div className="heading">
        <h2>{props.nameOfProject}</h2>
      </div>
      <div className="text">
        <p>
          {props.projectDescription.length > 200
            ? props.projectDescription.substring(0, 200) + "..."
            : props.projectDescription}
        </p>
      </div>
      <button
        onClick={() => {
          navigate(`/project/${props.id}`);
        }}
        className="keep-reading-button"
      >
        More...
      </button>
    </div>
  );
}

export default ProjectItem;
