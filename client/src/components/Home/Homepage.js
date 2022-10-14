import React, { useEffect, useState } from "react";
import Axios from "axios";

import Hero from "./Hero/hero";
import Services from "./Services/services";
import Projects from "./Projects/projects";
import About from "./About/about";
import ContactInfo from "./ContactInfo/contactinfo";
import Navbar from "./Navbar/navbar";
import site from "../../site";

Axios.defaults.withCredentials = true;

function Home() {
  if (window.scrollY > 300) {
    console.log("Scrolling");
  }

  const [projectsData, setProjectsData] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    Axios.get(`http://${site.hostname}:${site.port}/project`).then(
      (response) => {
        // we want to display latest projects hence the reversal
        const reversedArray = response.data.reverse();

        //limit the number of previewed projects to two
        const projectsArray = reversedArray.slice(0, 2);
        console.log(projectsArray);
        setProjectsData(projectsArray);
      }
    );
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: `http://${site.hostname}:${site.port}/photo`,
      withCredentials: true,
      // header: { "content-Type": "image/png" },
    })
      .then((response) => {
        console.log(
          `http://${site.hostname}:${site.port}/images/` + response.data
        );
        setImage(
          `http://${site.hostname}:${site.port}/images/` + response.data
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Projects projectsData={projectsData} />
      <About image={image} />
      <ContactInfo />
    </div>
  );
}

export default Home;
