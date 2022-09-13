import React from "react";
import "../blog/blog.css";
import { Navigate, useNavigate } from "react-router-dom";

function ProjectItem(props) {
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
          <div className="projectItem-details">Hello</div>
        ) : (
          <div
            style={{
              backgroundImage: "url(./images/projectlist-image.jpg)",
              backgroundSize: "cover",
              zIndex: "20",
              position: "relative",
              marginTop: "69px",
              height: "550px",
              width: "400px",
            }}
            className="projectItem-image"
          ></div>
        )}
      </div>
    </div>
  );
}

export default ProjectItem;
