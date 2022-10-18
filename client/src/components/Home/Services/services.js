import React from "react";
import ServiceItem from "./serviceItem";
import "./services.css";
import servicesData from "../servicesdata";
import AOS from "aos";
import "aos/dist/aos.css";

function Services() {
  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  let data = servicesData.map((item) => {
    return (
      <ServiceItem key={item.id} heading={item.heading} body={item.body} />
    );
  });

  return (
    <div id="services" className="services">
      <div className="service-heading-container">
        <h1 data-aos="fade-up" className="services-heading">
          SERVICES
        </h1>
        <p data-aos="fade-up" className="service-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
        </p>
      </div>
      <div className="service-body">{data}</div>
    </div>
  );
}

export default Services;
