import React, { useEffect, useState } from "react";
import Axios from "axios";

import Hero from "./Hero/hero";
import Services from "./Services/services";
import Projects from "./Projects/projects";
import About from "./About/about";
import ContactInfo from "./ContactInfo/contactinfo";

function Home() {
  if (window.scrollY > 300) {
    console.log("Scrolling");
  }

  const [projectsData, setProjectsData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/project").then((response) => {
      console.log(response.data);
      setProjectsData(response.data);
    });
  }, []);
  return (
    <div>
      <Hero />
      <Services />
      <Projects projectsData={projectsData} />
      <About />
      <ContactInfo />
    </div>
  );
}

export default Home;
