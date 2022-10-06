const db = require("../config/database");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { createToken } = require("../JWT");
const nodemailer = require("nodemailer");
const { render } = require("ejs");
require("dotenv").config();

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

//password reset because it has been forgoten

const recoverPassword = (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    console.log(result.length);
    if (result.length > 0) {
      const user = result[0];

      const token = createToken(user);
      res.cookie("access_Token", token, {
        maxAge: 50000,
        http: true,
        secure: true,
      });

      const path = "http://localhost:8080/api/forgotpassword";
      const link = path + "/" + token;
      console.log(link);

      //nodemailer

      ("use strict");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          // host: "smtp.gmail.email",
          // port: 587,
          // secure: false, // true for 465, false for other ports
          service: "Gmail",
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: "Sender", // sender address
          to: "marewilson35@gmail.com", // list of receivers
          subject: "Password Reset", // Subject line
          text: link, // plain text body
          html: `<b>${link}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.send("Message sent");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      main().catch(console.error);

      //res.status(200).send("Link sent to email");
    } else {
      res.status(400).send("User doesnt exist");
    }
  });
};

const changePassword = (req, res) => {
  const token = req.cookies["access_Token"];

  if (!token) {
    res.send("Session expired");
  }
  let validToken = "";

  if (token) {
    validToken = verify(token, process.env.TOKEN_SECRET);

    if (validToken) {
      res.render("index");

      // res.send("We are going to proceed with the process");
    }
  }

  /* try {
    console.log("try");
   

    if (validToken) {
      res.send("We are going to proceed with the process");
    }
  } catch {
    console.log("catch");
    // res.status(400).send("Process failed");
  }*/
};

module.exports = {
  logIn,
  getLogin,
  register,
  logOut,
  resetPassword,
  recoverPassword,
  changePassword,
};
