const db = require("../config/database");
const bcrypt = require("bcrypt");
const { createToken, validateToken } = require("../JWT");

const logIn = (req, res) => {
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
};

const getLogin = (req, res) => {
  res.status(200).send({ login: true, message: "You are logged in" });
};

const register = (req, res) => {
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
};

const logOut = (req, res) => {
  res.cookie("access_token", "", {
    maxAge: 1,
    httpOnly: true,
    secure: true,
  });
  res.status(200).send("You have logged out");
};

module.exports = { logIn, getLogin, register, logOut };
