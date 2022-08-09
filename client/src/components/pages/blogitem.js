import React from "react";
import "./blog.css";
import { Navigate, useNavigate } from "react-router-dom";

function BlogItem(props) {
  let navigate = useNavigate();
  return (
    <div className="blog-post">
      <div className="heading">
        <h2>{props.title}</h2>
        <h3>June 06 2021</h3>
      </div>
      <div className="text">
        <p>
          {props.blogposts.length > 200
            ? props.blogposts.substring(0, 200) + "..."
            : props.blogposts}
        </p>
      </div>
      <button
        onClick={() => {
          navigate(`/post/${props.id}`);
        }}
        className="keep-reading-button"
      >
        Keep Reading...
      </button>
    </div>
  );
}

export default BlogItem;
