import React from "react";
import "./blog.css";
import BlogItem from "./blogitem";
import Axios from "axios";

function Blog() {
  const [postList, setPostList] = React.useState([]);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/get/").then((postsData) => {
      setPostList(postsData.data);
    });
  }, []);

  let blogData = postList.map((item, key) => {
    return (
      <BlogItem
        key={key}
        id={item.id}
        title={item.title}
        blogposts={item.blogposts}
      />
    );
  });

  return (
    <>
      <div id="blog">
        <div className="blog">
          <div className="top-heading">
            <h1>Latest Blog Posts</h1>
          </div>
          {blogData}
        </div>
      </div>
    </>
  );
}

export default Blog;
