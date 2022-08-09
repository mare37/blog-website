import React from "react";

import Hero from "./Hero/hero";
import Services from "./Services/services";
import Projects from "./Projects/projects";
import About from "./About/about";
import ContactInfo from "./ContactInfo/contactinfo";

function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Projects />
      <About />
      <ContactInfo />
    </div>
  );
}

export default Home;
