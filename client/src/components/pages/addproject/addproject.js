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
  const [projectBackground, setProjectBackground] = useState("");
  const [projectChallenge, setProjectChallenge] = useState("");
  const [projectSolution, setProjectSolution] = useState("");

  //7 technical features
  const [projectTechnicalFeatures1, setprojectTechnicalFeatures1] =
    useState("");
  const [projectTechnicalFeatures2, setprojectTechnicalFeatures2] =
    useState("");
  const [projectTechnicalFeatures3, setprojectTechnicalFeatures3] =
    useState("");
  const [projectTechnicalFeatures4, setprojectTechnicalFeatures4] =
    useState("");
  const [projectTechnicalFeatures5, setprojectTechnicalFeatures5] =
    useState("");
  const [projectTechnicalFeatures6, setprojectTechnicalFeatures6] =
    useState("");
  const [projectTechnicalFeatures7, setprojectTechnicalFeatures7] =
    useState("");

  //technologies
  const [technologiesUsed, setTechnologiesUsed] = useState("");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const submitProject = () => {
      
    const array = [];

    array[0] = projectTechnicalFeatures1
    array[1] = projectTechnicalFeatures2
    array[2] = projectTechnicalFeatures3
    array[3] = projectTechnicalFeatures4
    array[4] = projectTechnicalFeatures5
    array[5] = projectTechnicalFeatures6
    array[6] = projectTechnicalFeatures7

    console.log(array);

     // 
    Axios.post(`/api/project`, {
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      projectBackground: projectBackground,
      projectChallenge: projectChallenge,
      projectSolution: projectSolution,
      technologiesUsed: technologiesUsed,
      technicalFeatures: array,
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
        <div className="addproject-container">
          <input
            onChange={(e) => {
              setProjectTitle(() => {
                return e.target.value;
              });
            }}
            className="addproject-title"
            type="text"
            placeholder="Project Title..."
          />

          <input
            onChange={(e) => {
              setProjectDescription(() => {
                return e.target.value;
              });
              console.log(projectTechnicalFeatures1);
            }}
            className="addproject-description"
            type="text"
            placeholder="Project Description..."
          />

          <p className="addproject-background-heading">Project Background</p>
          <textarea
            onChange={(e) => {
              setProjectBackground(() => {
                return e.target.value;
              });
            }}
            className="addproject-background"
            type="text"
            placeholder="Write here..."
          />

          <p className="addproject-background-heading">The Challenge</p>
          <textarea
            onChange={(e) => {
              setProjectChallenge(() => {
                return e.target.value;
              });
            }}
            className="addproject-background"
            type="text"
            placeholder="Write here..."
          />

          <p className="addproject-background-heading">The Solution</p>
          <textarea
            onChange={(e) => {
              setProjectSolution(() => {
                return e.target.value;
              });
            }}
            className="addproject-background"
            type="text"
            placeholder="Write here..."
          />

          <p className="addproject-background-heading">Technical Features</p>
          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures1(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />
          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures2(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />
          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures3(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />

          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures4(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />
          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures5(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />
          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures6(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />

          <textarea
            onChange={(e) => {
              setprojectTechnicalFeatures7(() => {
                return e.target.value;
              });
            }}
            className="addproject-technicalfeatures "
            placeholder="Write here..."
          />

          <p className="addproject-background-heading">Technologies</p>
          <input
            onChange={(e) => {
              setTechnologiesUsed(() => {
                return e.target.value;
              });
            }}
            className="addproject-technologies"
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
