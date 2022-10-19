import { useEffect } from "react";
import "./hero.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Hero() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div id="hero">
      <section
        style={{
          backgroundImage: `url(./images/computer.jpg)`,
          backgroundSize: "cover",
          position: "relative",
          zIndex: 1,
        }}
        className="hero"
      >
        <div className="container">
          <h1
            data-aos="fade-up"
            data-aos-duration="2000"
            className="container-heading"
          >
            The Top Machine Learning Experts. For Real Results. On Time
          </h1>
          <p data-aos="fade-up" data-aos-duration="3000" className="body-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised i{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
export default Hero;
