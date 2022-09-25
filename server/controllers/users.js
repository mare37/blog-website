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
      // console.log(result[0].password);
      bcrypt.compare(password, dbpassword, (err, match) => {
        if (match) {
          // console.log(result[0]);

          const accessToken = createToken(result[0]);
          res.cookie("access_token", accessToken, {
            maxAge: 36000000,
            httpOnly: true,
            secure: true,
          });

          res.send({
            auth: true,
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
      res.status(400).send("User doesnt exist");
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
          res.status(404).send(err);
        } else {
          restatus(200).send("USER REGISTERED");
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

//password reset

const resetPassword = (req, res) => {
  const email = req.body.email;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  // console.log(currentPassword + newPassword + email);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({
        auth: false,
        message: err,
      });
    }
    if (result.length > 0) {
      const databasePassword = result[0].password;
      bcrypt.compare(currentPassword, databasePassword).then((match) => {
        if (match) {
          bcrypt.hash(newPassword, 10).then((hash) => {
            db.query(
              "UPDATE users SET password = ?",
              [hash],
              (err, success) => {
                if (err) {
                  res.send(err);
                }
                res.status(200).send({
                  auth: true,
                  message: "Password Changed Successfully",
                });
              }
            );
          });
        }
        if (!match) {
          res.status(400).send({
            auth: false,
            message: "Wrong Password",
          });
        }
      });
    } else {
      res.status(400).send({
        auth: false,
        message: "User doesnt exist",
      });
    }
  });
};

module.exports = { logIn, getLogin, register, logOut, resetPassword };
