import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./posts.css";
import Navbar from "../../Home/Navbar/navbar";
import site from "../../../site";

import * as DOMPurify from "dompurify"; 

function Post() {
  let { postId } = useParams();
  const [post, setPost] = React.useState({});
  const [blogContent, setBlogContent] = React.useState("");

  React.useEffect(() => {
    console.log(postId);
    Axios.get(`/api/blogpost/${postId}`)
      .then((data) => {
        let cleanBlogContent = DOMPurify.sanitize(data.data[0].blogposts);
        setBlogContent(cleanBlogContent);
        setPost({
          title: data.data[0].title,
          date: data.data[0].date,
          author: data.data[0].author,
          time: data.data[0].time,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setPost({ title: "ERROR 404" });
        setBlogContent("ERROR! POST MOVED OR DELETED");
      });
  }, [postId]);

  return (
    <>
      <Navbar />
      <div id="post-background">
        <div className="post-header">
          <div>
            <h2>
              <span> AI </span> BLOG
            </h2>
            <p>Latest artificial inteligence information</p>
          </div>
        </div>
        <div className="post-cont">
          <h2 className="post-title">{post.title}</h2>

          <div className="post-author">{`Posted by ${post.author}`}</div>
          <div className="post-date">
            {post.date}, <span> {post.time} EAT</span>
          </div>

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: blogContent }}
          />
        </div>

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

export default Post;
