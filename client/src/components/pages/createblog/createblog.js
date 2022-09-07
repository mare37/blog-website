import React, { useState } from "react";
import Axios from "axios";
import "./createblog.css";
import NavBar from "../admin/admin-navbar.js";
import SideBar from "../admin/admin-sidebar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [author, setAuthor] = useState("Jacon Keya");

  function submitPost() {
    Axios.post("http://localhost:8080/blogpost", {
      title: title,
      id: 1,
      bodyText: bodyText,
      author: author,
      date: new Date().toISOString().slice(0, 10),
      //cookies: { "access-token": read_cookie("token") },
    })
      .then((response) => {
        console.log(response);
        navigate("/articlesandprojects");
        alert("Blog created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const confirm = () => {
    confirmAlert({
      title: "Confirm",
      message: "Click Ok To Publish",
      buttons: [
        {
          label: "  Ok",
          onClick: () => {
            submitPost();
          },
        },
        {
          label: "No",
          onClick: () => {
            alert("Click ok");
          },
        },
      ],
    });
  };

  return (
    <div id="create-blog">
      <NavBar />
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
          <button onClick={confirm}>Publish</button>
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default CreateBlog;
