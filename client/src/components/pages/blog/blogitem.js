import React from "react";
import "./blog.css";

import { useNavigate } from "react-router-dom";

import * as DOMPurify from "dompurify";

function BlogItem(props) {
  let navigate = useNavigate();

  let post = "";
  const cleanBlogContent = DOMPurify.sanitize(props.blogposts);
  if (cleanBlogContent.length > 400) {
    post = cleanBlogContent.substring(0, 400) + "...";
  } else {
    post = cleanBlogContent;
  }
  return (
    <div className="blog-post">
      <div className="heading">
        <h2>{props.title}</h2>
      </div>
      <div className="text" dangerouslySetInnerHTML={{ __html: post }} />

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
