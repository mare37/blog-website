import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./navbar.css";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  let [click, setClick] = React.useState(true);
  let [headerScrollClass, setHeaderScrollClass] = React.useState(false);
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

  //

  /* React.useEffect(() => {
    setPath(window.location.pathname);
  }, []);
  console.log(window.location.pathname);*/

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

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setHeaderScrollClass(true);
    } else {
      console.log(window.scrollY);
      setHeaderScrollClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [headerScrollClass]);

  const { postId } = useParams();

  let headerClass;
  if (
    window.location.pathname === "/blog" ||
    window.location.pathname === "/projectlist" ||
    window.location.pathname === "/contact"
  ) {
    console.log("/blog");
    headerClass = "header-blog";
  }
  if (window.location.pathname === `/post/${postId}`) {
    console.log(`/post/${postId}`);
    headerClass = "header-blog";
  }
  if (window.location.pathname === "/" && headerScrollClass === true) {
    console.log(window.scrollY);
    // console.log("Home");
    headerClass = "header-scroll ";
  }

  return (
    <nav id="header">
      <div className={headerClass}>
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
            <Link to="/contact">
              <button className="navbar-contact-us">Contact Us</button>
            </Link>
          </section>
          <ul
            onClick={handleClick}
            className={click ? "unorder-list" : "unorder-list active"}
          >
            <li>
              <Link className="list-item" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="list-item" to="/blog">
                BLOG
              </Link>
            </li>
            <li>
              <HashLink className="list-item" to="/#services">
                SERVICES
              </HashLink>
            </li>
            <li>
              <HashLink className="list-item" to="/#projects">
                PROJECTS
              </HashLink>
            </li>
            <li>
              <HashLink className="list-item" to="/#about">
                ABOUT
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
