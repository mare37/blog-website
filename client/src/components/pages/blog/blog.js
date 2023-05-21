import React, { useEffect } from "react";
import "./blog.css";
import BlogItem from "./blogitem";
import Axios from "axios";
import Navbar from "../../Home/Navbar/navbar";
import site from "../../../site";
import AOS from "aos";
import "aos/dist/aos.css";

function Blog() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    Axios.get(`/api/blogpost`).then(
      (postsData) => {
        setPostList(postsData.data);
      }
    );
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
      <Navbar />
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
          <p data-aos="fade-up" className="top-heading">
            Latest Posts
          </p>
        </div>
        <div className="blog">{blogData}</div>
      </div>
    </>
  );
}

export default Blog;
