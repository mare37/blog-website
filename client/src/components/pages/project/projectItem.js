import React from "react";
import "../blog/blog.css";
import { useNavigate } from "react-router-dom";

function ProjectItem(props) {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(false);

  const handleDetails = () => {
    setActive((prev) => {
      console.log(!prev);
      return !prev;
    });
  };

  return (
    <div id="projectItem">
      <div
        onMouseOver={handleDetails}
        onMouseOut={handleDetails}
        className=" projectItem-image-container "
      >
        <div
          className={
            active ? "projectItem-details active" : "projectItem-details"
          }
        >
          <h2 className={active ? "active" : ""}>{props.nameOfProject}</h2>
          <p className={active ? "active" : ""}>
            {props.projectDescription.length > 200
              ? props.projectDescription.slice(0, 200) + "..."
              : props.projectDescription}
          </p>
          <p>Hover To View Details</p>
          <button
            className={active ? "active" : ""}
            onClick={() => {
              navigate(`/project/${props.id}`);
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
