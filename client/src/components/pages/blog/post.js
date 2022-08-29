import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./posts.css";

function Post() {
  let { postId } = useParams();
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    Axios.get(`http://localhost:8080/blogpost/${postId}`).then((data) => {
      setPost({
        title: data.data[0].title,
        blogposts: data.data[0].blogposts,
        author: data.data[0].author,
      });
      console.log(data);
    });
  }, []);
  console.log(post);

  return (
    <div id="post-background">
      <div className="post-cont">
        <div className="title">{post.title}</div>
        <div className="body">{post.blogposts}</div>
        <div className="author">{post.author}</div>
      </div>
    </div>
  );
}

export default Post;
