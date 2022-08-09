import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./components/pages/blog";
import Navbar from "./components/Home/Navbar/navbar";
import Admin from "./components/pages/admin";
//import Footer from "./components/Home/Footer/footer";
import ScrollToTop from "./scrollTop";
import CreateBlog from "./components/pages/createblog";
import Post from "./components/pages/post";
import LogIn from "./components/pages/login";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function App() {
  const [page, setPage] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/login")
      .then((response) => {
        console.log(response.data.login);
        setPage(response.data.login);
      })
      .catch((err) => {
        if (err) {
          setPage(false);
          console.log("Not logged In");
        }
      });
  }, [page]);

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={page ? <Admin /> : <LogIn />} />
          <Route
            path="/createblog"
            element={page ? <CreateBlog /> : <LogIn />}
          />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/login" element={page ? <Admin /> : <LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
