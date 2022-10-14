const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./JWT");
const bodyParser = require("body-parser");
const site = require("./config/site");

//importing routes
const postsRoute = require("./routes/posts");
const projectsRoute = require("./routes/projects");
const usersRoute = require("./routes/users");
const contactRoute = require("./routes/contacts");
const photoAndResumeRoute = require("./routes/photo-and-resume");
const verifyUser = require("./routes/userVerify");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
//app.use(express.static("./public"));

//app.set("views", path.join(__dirname, "views"));
app.use(express.static("./public"));
app.set("view engine", "ejs");

//routes
app.use("/blogpost", postsRoute);
app.use("/project", projectsRoute);
app.use("/contact", contactRoute);
app.use(photoAndResumeRoute);
app.use(usersRoute);
app.use("/verifyuser", verifyUser);

//"ALTER TABLE posts AUTO_INCREMENT = 1"

app.get("/", validateToken, (req, res) => {
  //db
  // .query
  // "ALTER TABLE posts AUTO_INCREMENT = 1"
  //"INSERT INTO posts (title, blogposts, author) VALUES ('onee', 'two', 'three'  ) "
  //  ();

  res.send("HOME");
});

app.listen(site.port, () => {
  console.log(`Server running on port ${site.port}...`);
});
