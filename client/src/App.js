import React from "react";
import "./App.css";
import Home from "./components/Home/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./components/pages/blog/blog";
import Navbar from "./components/Home/Navbar/navbar";
import Admin from "./components/pages/admin/admin";
import Footer from "./components/Home/Footer/footer";
import ScrollToTop from "./scrollTop";
import CreateBlog from "./components/pages/createblog/createblog";
import Post from "./components/pages/blog/post";
import LogIn from "./components/pages/login/login";
import ProtectedRoute from "./components/pages/protectedroutes";
import WithNavBar from "./components/pages/withnavbar";
import AddProject from "./components/pages/addproject/addproject";
import ProjectList from "./components/pages/project/projectlist";
import ProjectPage from "./components/pages/project/projectpage";
import ArticlesAndProjects from "./components/pages/articlesAndprojects/articlesAndprojects";
import UpdateBlog from "./components/pages/createblog/updateblog";
import UpdateProject from "./components/pages/addproject/updateproject";
import ContactPage from "./components/pages/contact/contactpage";
import Messages from "./components/pages/messages/messages";
function App() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  // let [headerScrollClass, setHeaderScrollClass] = React.useState(false);

  if (window.scrollY > 300) {
    console.log("Scrolling");
  }

  /* const changeBackground = () => {
    if (window.scrollY > 400) {
      // console.log(window.scrollY);
      setHeaderScrollClass(true);
      console.log(headerScrollClass);
    } else {
      setHeaderScrollClass(false);
      console.log(headerScrollClass);
    }
  };

  window.addEventListener("scroll", changeBackground);*/

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
            path="/contact"
            element={
              <>
                <WithNavBar /> <ContactPage />
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
                <ProjectPage /> <WithNavBar />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <LogIn />
              </>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/createblog" element={<CreateBlog />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/addproject" element={<AddProject />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="/articlesandprojects"
              element={<ArticlesAndProjects />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/updateblog/:postId" element={<UpdateBlog />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/updateproject/:postId" element={<UpdateProject />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/messages" element={<Messages />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
