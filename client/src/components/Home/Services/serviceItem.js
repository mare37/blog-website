import React from "react";
import "./services.css";

function ServiceItem(props) {
  return (
    <div
      className="service-item"
      style={{
        backgroundImage: `url(./images/computer2.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="service-item-content">
        <h3>{props.heading}</h3>
        <p>{props.body}</p>
      </div>
    </div>
  );
}

export default ServiceItem;
