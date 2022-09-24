import React from "react";
import "../blog/blog.css";
import { useNavigate } from "react-router-dom";

function ProjectItem(props) {
  const navigate = useNavigate();
  const [details, setDetails] = React.useState(false);

  const handleDetails = () => {
    setDetails((prev) => {
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
        {details ? (
          <div className="projectItem-details">
            <h2>Monitoring App</h2>
            <p>
              The largest athletic merchandise and video engagement platform for
              sports fans, where everyone can find merchandise, live streaming
              events, and training videos with local and world-known athletes.
            </p>
            <button
              onClick={() => {
                navigate(`/project/${props.id}`);
              }}
            >
              Learn More
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundImage: "url(./images/projectlist-image.jpg)",
              backgroundSize: "cover",
              zIndex: "20",
              position: "relative",
              marginTop: "69px",
              height: "450px",
              width: "350px",
            }}
            className="projectItem-image"
          >
            <p className="projectItem-image-heading">Monitoring App</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectItem;
