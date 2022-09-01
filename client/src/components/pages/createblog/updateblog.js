import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./createblog.css";
import { useParams, useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function UpdateBlog() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [author, setAuthor] = useState("Jacon Keya");

  useEffect(() => {
    Axios.get(`http://localhost:8080/blogpost/${postId}`).then((response) => {
      setTitle(response.data[0].title);
      setBodyText(response.data[0].blogposts);
    });
  }, []);

  function updatePost() {
    Axios.put(`http://localhost:8080/blogpost/${postId}`, {
      title: title,
      bodyText: bodyText,
      author: author,
      date: new Date().toISOString().slice(0, 10),
    })
      .then((response) => {
        console.log(response.data);
        navigate("/articlesandprojects");
        alert("Updated successfully!Click Ok");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="create-blog">
      <div className="post-container">
        <input
          onChange={(e) => {
            setTitle(() => {
              return e.target.value;
            });
            console.log(title);
          }}
          value={title}
          className="title"
          type="text"
          placeholder="Title..."
        />

        <textarea
          onChange={(e) => {
            setBodyText(() => {
              return e.target.value;
            });
          }}
          value={bodyText}
          className="create-blog-text"
          type="text"
          placeholder="Write here..."
        />

        <div className="select-author">
          <h3>Author: </h3>
          <select
            onChange={(e) => {
              setAuthor(() => {
                return e.target.value;
              });
            }}
          >
            <option value="Jacon Kenya">Jacon Keya</option>
          </select>
        </div>

        <div className="publish-button">
          <button onClick={updatePost}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
