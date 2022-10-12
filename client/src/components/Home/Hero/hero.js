import "./hero.css";

function Hero() {
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
          <h1 className="container-heading">
            The Top Machine Learning Experts. For Real Results. On Time
          </h1>
          <p className="body-text">
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
