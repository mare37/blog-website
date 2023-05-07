import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//Pages and Components
import Home from "./components/Home/Homepage";
import Blog from "./components/pages/blog/blog";
import Admin from "./components/pages/admin/admin";
import Footer from "./components/Home/Footer/footer";
import ScrollToTop from "./scrollTop";
import CreateBlog from "./components/pages/createblog/createblog";
import Post from "./components/pages/blog/post";
import LogIn from "./components/pages/login/login";
import ProtectedRoute from "./components/pages/protectedroutes";
import AddProject from "./components/pages/addproject/addproject";
import ProjectList from "./components/pages/project/projectlist";
import ProjectPage from "./components/pages/project/projectpage";
import ArticlesAndProjects from "./components/pages/articlesAndprojects/articlesAndprojects";
import UpdateBlog from "./components/pages/createblog/updateblog";
import UpdateProject from "./components/pages/addproject/updateproject";
import ContactPage from "./components/pages/contact/contactpage";
import Messages from "./components/pages/messages/messages";
import ChangePassword from "./components/pages/changepassword/changepassword";
import ResetPassword from "./components/pages/resetpassword/resetpassword";
import TermsAndConditions from "./components/pages/termsandpolicy";

function App() {
  if (window.scrollY > 300) {
    console.log("Scrolling");
  }

  return (
    <div>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/projectlist" element={<ProjectList />} />

          <Route path="/project/:projectId" element={<ProjectPage />} />

          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          

          <Route
            path="/articlesandprojects"
            element={<ArticlesAndProjects />}
          />

          <Route path="/messages" element={<Messages />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/addproject" element={<AddProject />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
          </Route>
        

          <Route element={<ProtectedRoute />}></Route>

          <Route element={<ProtectedRoute />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/updateblog/:postId" element={<UpdateBlog />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/updateproject/:postId" element={<UpdateProject />} />
          </Route>
          <Route element={<ProtectedRoute />}>
          <Route path="/createblog" element={<CreateBlog />} />
          </Route>
          <Route element={<ProtectedRoute />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
