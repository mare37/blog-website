import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./createblog.css";
import { Editor } from "@tinymce/tinymce-react";

import { useParams, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import site from "../../../site";

Axios.defaults.withCredentials = true;

function UpdateBlog() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [author, setAuthor] = useState("Jacon Keya");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let text = editorRef.current.getContent();
      setBodyText(text);
      //  let plainText = editorRef.getContent({ format: text });
      console.log(bodyText);
    }
  };

  useEffect(() => {
    Axios.get(`/api/blogpost/${postId}`).then(
      (response) => {
        setTitle(response.data[0].title);
        setBodyText(response.data[0].blogposts);
      }
    );
  }, [postId]);
  //  console.log(bodyText);

  function updatePost() {
    Axios.put(`/api/blogpost/${postId}`, {
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

  const confirm = () => {
    confirmAlert({
      title: "Confirm",
      message: "Click Ok To Update",
      buttons: [
        {
          label: "  Ok",
          onClick: () => {
            updatePost();
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

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={bodyText}
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
        <button onClick={log}>Log editor content</button>

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
          <button onClick={confirm}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
