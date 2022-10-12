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
          <h2 className={active ? "active" : ""}>Monitoring App</h2>
          <p className={active ? "active" : ""}>
            The largest athletic merchandise and video engagement platform for
            sports fans, where everyone can find merchandise, live streaming
            events, and training videos with local and world-known athletes.
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
