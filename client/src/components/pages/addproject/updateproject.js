import React, { useEffect, useState } from "react";
import "./addproject.css";

import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import site from "../../../site";

Axios.defaults.withCredentials = true;

function UpdateProject() {
  const { postId } = useParams();
  let navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    Axios.get(`http://${site.hostname}:${site.port}/project/${postId}`).then(
      (response) => {
        console.log(response.data);
        setProjectTitle(response.data[0].nameOfProject);
        setProjectDescription(response.data[0].projectDescription);
      }
    );
  }, [postId]);

  const update = () => {
    Axios.put(`http://${site.hostname}:${site.port}/project/${postId}`, {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
    }).then((response) => {
      console.log(response);
      alert("Project Updated succesfully!");
      navigate("/articlesandprojects");
    });
  };

  const confirm = () => {
    confirmAlert({
      title: "Confirm",
      message: "Click Ok To Update",
      buttons: [
        {
          label: "  Ok",
          onClick: () => {
            update();
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
            value={projectTitle}
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
            value={projectDescription}
            placeholder="Write here..."
          />

          <div className="publish-button">
            <button onClick={confirm}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
