import React, { useEffect } from "react";
import "./services.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ServiceItem(props) {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="service-item"
      style={{
        backgroundImage: `url(./images/projectlist-image2.jpg)`,
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
