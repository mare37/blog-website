import React from "react";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import site from "../../../site";

function Delete(id, elementName) {
  console.log(id);
  if (elementName === "BlogPostsElement") {
    Axios({
      method: "delete",
      url: `http://${site.hostname}:${site.port}/blogpost`,
      header: "application/json",
      data: { id: id },
    }).then((response) => {
      console.log(response.data);
    });
  } else {
    Axios({
      method: "delete",
      url: `http://${site.hostname}:${site.port}/project`,
      header: "application/json",
      data: { id: id },
    }).then((response) => {
      console.log(response.data);
    });
  }

  window.location.reload();
}
const confirm = (id, elementName) => {
  confirmAlert({
    title: "Confirm",
    message: "Are you sure you want to do this?You cant undo this!",
    buttons: [
      {
        label: "Proceed",
        onClick: () => {
          Delete(id, elementName);
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


//blogs element
export function BlogPostsElement(props) {
  const navigate = useNavigate();
  return (
    <div className="element-container">
      <p className="element-id">{props.id}</p>
      <p
        onClick={() => {
          navigate(`/post/${props.id}`);
        }}
        className="element-title"
      >
        {props.title}
      </p>

      <div className="date-and-buttons">
        <p className="element-date">
          {props.date} <span>{props.time}</span>
        </p>
        <div className="element-buttons">
          <button
            onClick={() => {
              navigate(`/updateblog/${props.id}`);
            }}
            className="update"
          >
            Edit
          </button>
          <button
            onClick={() => {
              confirm(props.id, "BlogPostsElement");
            }}
            className="delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export const ProjectsElement = (props) => {
  const navigate = useNavigate();
  return (
    <div className="element-container">
      <p className="element-id">{props.id}</p>
      <p
        className="element-title"
        onClick={() => {
          navigate(`/project/${props.id}`);
        }}
      >
        {props.nameOfProject}
      </p>
      <div className="date-and-buttons">
        <p className="element-date">
          {props.date} <span>{props.time}</span>
        </p>
        <div className="element-buttons">
          <button
            onClick={() => {
              navigate(`/updateproject/${props.id}`);
            }}
            className="update"
          >
            Update
          </button>
          <button
            onClick={() => {
              confirm(props.id, "ProjectsElement");
            }}
            className="delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const elements = {
  ProjectsElement,
  BlogPostsElement,
};

export default elements;
