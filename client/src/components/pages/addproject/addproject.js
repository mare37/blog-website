import React, { useState } from "react";
import "./addproject.css";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import NavBar from "../admin/admin-navbar";
import SideBar from "../admin/admin-sidebar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
//Using css from createblog.css
import site from "../../../site";

Axios.defaults.withCredentials = true;

function AddProject() {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const submitProject = () => {
    Axios.post(`/api/project`, {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      dateAndTime: {
        date: new Date().toLocaleDateString("en-uk", options),
        time: new Date().toLocaleTimeString(),
      },
    }).then((response) => {
      navigate("/articlesAndprojects");
      alert("Project Posted Successfully");
      console.log(response);
    });
  };

  const confirm = () => {
    confirmAlert({
      title: "Confirm",
      message: "Click Ok To Publish",
      buttons: [
        {
          label: "  Ok",
          onClick: () => {
            submitProject();
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
    <div>
      <div className="add-project">
        <NavBar />
        <br />
        <br />
        <br />
        <div className="post-container">
          <input
            onChange={(e) => {
              setProjectTitle(() => {
                return e.target.value;
              });
            }}
            className="title"
            type="text"
            placeholder="Project Title..."
          />
          <textarea
            onChange={(e) => {
              setProjectDescription(() => {
                return e.target.value;
              });
            }}
            className="create-blog-text"
            type="text"
            placeholder="Write here..."
          />

          <div className="publish-button">
            <button onClick={confirm}>Publish</button>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AddProject;
