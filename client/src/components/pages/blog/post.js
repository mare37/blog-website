import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./posts.css";
import Markdown from "markdown-to-jsx";
import * as DOMPurify from "dompurify";

function Post() {
  let { postId } = useParams();
  const [post, setPost] = React.useState({});
  const [blogContent, setBlogContent] = React.useState("");

  React.useEffect(() => {
    Axios.get(`http://localhost:8080/blogpost/${postId}`).then((data) => {
      let cleanBlogContent = DOMPurify.sanitize(data.data[0].blogposts);
      setBlogContent(cleanBlogContent);
      setPost({
        title: data.data[0].title,
        blogposts: data.data[0].blogposts,
        author: data.data[0].author,
      });
      console.log(data);
    });
  }, []);
  console.log(String(post.blogposts));

  return (
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
        <div className="post-date">Friday 15th September</div>
        <div className="post-author">{`Posted by ${post.author}`}</div>

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
  );
}

export default Post;
