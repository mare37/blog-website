import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./createblog.css";
import LogIn from "./login";
//import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import { Navigate, useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [author, setAuthor] = useState("Jacon Keya");

  function submitPost() {
    Axios.post("http://localhost:8080/api/create", {
      title: title,
      bodyText: bodyText,
      author: author,
      //cookies: { "access-token": read_cookie("token") },
    });
    console.log("Blog Posted");
  }

  return (
    <div id="create-blog">
      <div className="post-container">
        <input
          onChange={(e) => {
            setTitle(() => {
              return e.target.value;
            });
          }}
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
          <button onClick={submitPost}>Publish</button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
