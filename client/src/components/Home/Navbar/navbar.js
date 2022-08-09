import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  let [click, setClick] = React.useState(true);
  // let [styleDiv, setStyle] = React.useState(false);
  //  const ref = React.useRef(null);

  function handleClick() {
    setClick((preValue) => {
      return !preValue;
    });
  }

  function changeMobileMenu() {
    setClick((preValue) => {
      return !preValue;
    });
    // console.log(click);
  }

  //-----------------------------------------------------------------

  /*let list;
  React.useEffect(() => {
    list = Array.from(document.getElementsByClassName("unorder-list"));
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    element.addEventListener("click", () => {
      list[1].classList.toggle("active");
    });
  }, []);*/

  //--------------------------------------------------------------------

  return (
    <nav id="header">
      <div className="header">
        <div className="nav">
          <section className="navbar-logo">
            <Link to="/">
              <span className="navbar-logo-text">ML</span>
              <img
                alt="img"
                className="navbar-logo-image"
                src="./images/deep-learning.png"
              />
            </Link>
          </section>
          <ul
            onClick={changeMobileMenu}
            className={click ? "unorder-list" : "unorder-list active"}
          >
            <li>
              <Link className="list-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="list-item" to="/blog">
                Blog
              </Link>
            </li>
            <li>
              <HashLink className="list-item" to="/#services">
                Services
              </HashLink>
            </li>
            <li>
              <HashLink className="list-item" to="/#projects">
                Projects
              </HashLink>
            </li>
            <li>
              <HashLink className="list-item" to="/#about">
                About
              </HashLink>
            </li>
          </ul>

          <div
            id="menu-icon"
            onClick={handleClick}
            className="navbar-menu-icon"
          >
            {click ? (
              <img
                className="humburger-icon"
                alt="icon"
                src="./images/menu2.png"
              />
            ) : (
              <img
                className="close-icon"
                alt="icon"
                src="./images/close2.png "
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
