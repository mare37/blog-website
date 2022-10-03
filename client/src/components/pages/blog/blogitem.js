import React from "react";
import "./blog.css";
import Markdown from "markdown-to-jsx";
import { render } from "react-dom";
import { Navigate, useNavigate } from "react-router-dom";

function BlogItem(props) {
  let navigate = useNavigate();

  let post = "";
  if (props.blogposts.length > 200) {
    post = props.blogposts.substring(0, 200) + "...";
  } else {
    post = props.blogposts;
  }
  return (
    <div className="blog-post">
      <div className="heading">
        <h2>{props.title}</h2>
        <h3>{props.date}</h3>
      </div>
      <div className="text">
        {" "}
        <Markdown>{post}</Markdown>
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
