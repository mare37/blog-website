import React from "react";
import "./blog.css";
import BlogItem from "./blogitem";
import Axios from "axios";
function Blog() {
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    Axios.get("http://localhost:8080/blogpost").then((postsData) => {
      setPostList(postsData.data);
    });
  }, []);

  let blogData = postList
    .slice(0)
    .reverse()
    .map((item, key) => {
      return (
        <BlogItem
          key={key}
          id={item.id}
          title={item.title}
          date={item.date}
          blogposts={item.blogposts}
        />
      );
    });

  return (
    <>
      <div id="blog">
        <div
          style={{
            backgroundImage: "url(./images/blogimage.jpg)",
            backgroundSize: "cover",
            zIndex: "20",
            position: "relative",
            marginTop: "69px",
            height: "250px",
          }}
          className="blog-image"
        >
          <p className="top-heading">Latest Posts</p>
        </div>
        <div className="blog">{blogData}</div>
        <div className="post-subscribe-newsletter">
          <div className="post-subscribe-box">
            <input placeholder="Email" />
            <button>Subscribe To Our Newsletter</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
