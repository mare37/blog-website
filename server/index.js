const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./JWT");

//importing routes
const postsRoute = require("./routes/posts");
const projectsRoute = require("./routes/projects");
const usersRoute = require("./routes/users");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

//routes
app.use("/blogpost", postsRoute);
app.use("/project", projectsRoute);
app.use(usersRoute);

//"ALTER TABLE posts AUTO_INCREMENT = 1"

app.get("/", validateToken, (req, res) => {
  //db
  // .query
  // "ALTER TABLE posts AUTO_INCREMENT = 1"
  //"INSERT INTO posts (title, blogposts, author) VALUES ('onee', 'two', 'three'  ) "
  //  ();

  res.send("HOME");
});

app.listen(8080, () => {
  console.log(`Server running...`);
});
