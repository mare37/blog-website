import React from "react";
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
import ProtectedRoute from "./components/pages/protectedroutes";
import WithOutNavBar from "./components/pages/withoutnavbar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = React.useState(false);

  if (location.pathname === "/admin") {
    setIsAdmin(true);
  }

  return (
    <div>
      <Router>
        <ScrollToTop />
        {isAdmin && <Navbar />}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/login" element={<LogIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/createblog" element={<CreateBlog />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
