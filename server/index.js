const express = require("express");
const app = express();
const db = require("./config/database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { json } = require("express");
const cookieParser = require("cookie-parser");
const { createToken, validateToken } = require("./JWT");

/*const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      var msg = `The CORS policy for this site does not allow access from the specified Origin`;
      callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};*/

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
//app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/api/projectlist", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/api/createproject", validateToken, (req, res) => {
  const projectName = req.body.projectTitle;
  const projectDescription = req.body.projectDescription;

  db.query(
    "INSERT INTO projects (nameOfproject, projectDescription) VALUES(?,?)",
    [projectName, projectDescription],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );

  res.status(200).send("ok");
});

app.get("/api/logout", (req, res) => {
  res.cookie("access_token", "", {
    maxAge: 1,
    httpOnly: true,
    secure: true,
  });
  res.status(200).send("You have logged out");
});

app.get("/api/login", validateToken, (req, res) => {
  res.status(200).send({ login: true, message: "You are logged in" });
});

app.post("/api/login", (req, res) => {
  //const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  let user = "SELECT * FROM users WHERE email = ?";
  db.query(user, [email], (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(result);
    if (result.length > 0) {
      const dbpassword = result[0].password;
      bcrypt.compare(password, dbpassword, (err, match) => {
        if (match) {
          console.log(result[0]);

          const accessToken = createToken(result[0]);
          res.cookie("access_token", accessToken, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
          });

          res.send({
            auth: true,
            accessToken: accessToken,
            message: "You are logged in!",
          });
        } else {
          console.log(match);
          res.send({
            auth: false,
            message: "Wrong password!",
          });
        }
      });
    } else {
      res.send("User doesnt exist");
    }
  });
});

app.post("/api/register", validateToken, (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, hash],
      (err, result) => {
        if (err) {
          res.status(404).send("REGISTER NOT FOUND");
        } else {
          res.send("USER REGISTERED");
        }
      }
    );
  });
});

app.get("/api/getpost/:postId", (req, res) => {
  const { postId } = req.params;

  db.query(`SELECT * FROM posts WHERE id = ${postId} `, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/create", validateToken, (req, res) => {
  const title = req.body.title;
  const bodyText = req.body.bodyText;
  const author = req.body.author;
  const date = req.body.date;
  db.query(
    "INSERT INTO posts (title, blogposts, author, date) VALUES (?,?,?,?)",
    [title, bodyText, author, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );

  res.send("CREATE BLOG");
});
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
