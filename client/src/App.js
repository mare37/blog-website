import React from "react";
import "./App.css";
import Home from "./components/Home/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./components/pages/blog/blog";
import Navbar from "./components/Home/Navbar/navbar";
import Admin from "./components/pages/admin/admin";
//import Footer from "./components/Home/Footer/footer";
import ScrollToTop from "./scrollTop";
import CreateBlog from "./components/pages/createblog/createblog";
import Post from "./components/pages/blog/post";
import LogIn from "./components/pages/login/login";
import ProtectedRoute from "./components/pages/protectedroutes";
import WithNavBar from "./components/pages/withnavbar";
import AddProject from "./components/pages/addproject/addproject";
import ProjectList from "./components/pages/project/projectlist";

function App() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <div>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Home /> <WithNavBar />
              </>
            }
          />

          <Route
            path="/blog"
            element={
              <>
                <Blog /> <WithNavBar />
              </>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <>
                <Post /> <WithNavBar />
              </>
            }
          />
          <Route
            path="/projectlist"
            element={
              <>
                <ProjectList /> <WithNavBar />
              </>
            }
          />

          <Route
            path="/project/:projectId"
            element={
              <>
                <Post /> <WithNavBar />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <LogIn /> <WithNavBar />
              </>
            }
          />

          <Route
            element={
              <>
                <ProtectedRoute />
              </>
            }
          >
            <Route path="/createblog" element={<CreateBlog />} />
          </Route>
          <Route
            element={
              <>
                <ProtectedRoute />
              </>
            }
          >
            <Route path="/addproject" element={<AddProject />} />
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
