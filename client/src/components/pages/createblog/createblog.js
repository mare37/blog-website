import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import "./createblog.css";
import { Editor } from "@tinymce/tinymce-react";

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
  const [button, setButton] = useState(true);

  function submitPost() {
    Axios.post("http://localhost:8080/blogpost", {
      title: title,
      id: 1,
      bodyText: bodyText,
      author: author,
      date: new Date().toISOString().slice(0, 10),
    })
      .then((response) => {
        console.log(response);
        navigate("/articlesandprojects");
        alert("Blog created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    //discard title and content when done with it
    localStorage.clear();
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

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let text = editorRef.current.getContent();
      setBodyText(text);
      console.log(bodyText);
    }
    setButton(false);
  };
  const onChange = (e) => {
    //store content for future use
    localStorage.setItem("content", JSON.stringify(e));
  };

  const storedTitle = JSON.parse(localStorage.getItem("title"));

  const storedcontent = JSON.parse(localStorage.getItem("content"));

  return (
    <div id="create-blog">
      <NavBar />
      <div className="post-container">
        <input
          value={storedTitle}
          onChange={(e) => {
            setTitle(e.target.value);
            //save title for future use
            localStorage.setItem("title", JSON.stringify(e.target.value));
          }}
          className="title"
          type="text"
          placeholder="Title..."
        />

        <Editor
          onEditorChange={onChange}
          className="create-blog-text"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={storedcontent}
          init={{
            height: 350,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        {button ? (
          <div className="publish-button">
            <button className="save-button" onClick={log}>
              Save Content
            </button>
          </div>
        ) : (
          <div className="publish-button">
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
            <button onClick={confirm}>Publish</button>
          </div>
        )}

        <SideBar />
      </div>
    </div>
  );
}

export default CreateBlog;
