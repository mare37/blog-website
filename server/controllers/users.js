const db = require("../config/database");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { createToken } = require("../JWT");
const nodemailer = require("nodemailer");
const { render } = require("ejs");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
const logger = require("../logger");
const site = require("../config/site");
//const bodyParser = require("body-parser");

const logIn = (req, res) => {
  //const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  let user = "SELECT * FROM users WHERE email = ?";
  db.query(user, [email], (err, result) => {
    if (err) {
      logger.error(   JSON.stringify( {method: 'POST', route:'/blogpost', err: err} ));
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

          logger.info(  JSON.stringify( {method: 'POST', route:'/login', info: 'You are logged in'} )    )
          res.send(result).status(200);

          res.send({
            auth: true,
            message: "You are logged in!",
          }).status(200);
        } else {
          console.log(match);
          logger.info(  JSON.stringify( {method: 'POST', route:'/login', info: 'Wrong password'} )    )
          res.send({
            auth: false,
            message: "Wrong password!",
          }).status(401);
        }
      });
    } else {
      logger.info(  JSON.stringify( {method: 'POST', route:'/login', info: 'User doesnt exist'} )    )
      res.status(401).send("User doesnt exist");
    }
  });
};

const getLogin = (req, res) => {
  logger.info(  JSON.stringify( {method: 'GET', route:'/login', info: 'You are still logged in'} )    )
  res.status(200).send({ login: true, message: "You are still logged in" });
};

const register = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, hash],
      (err, result) => {
        if (err) {
          logger.error(   JSON.stringify( {method: 'POST', route:'/register', err: err} ));
          res.status(500).send(err);
        } else {
          logger.info(  JSON.stringify( {method: 'POST', route:'/register', info: 'User registered successfully'} )    )
          res.status(200).send("USER REGISTERED");
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
  logger.info(  JSON.stringify( {method: 'GET', route:'/logout', info: 'You have logged out'} )    )
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
      logger.error(   JSON.stringify( {method: 'POST', route:'/resetpassword', err: err} ));
      res.status(500).send({
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
                  logger.error(   JSON.stringify( {method: 'POST', route:'/resetpassword', err: err} ));
                  res.send(err).status(500);
                }

                logger.info(   JSON.stringify( {method: 'POST', route:'/resetpassword', info:"Password Changed Successfully" } ));
                res.status(200).send({
                  auth: true,
                  message: "Password Changed Successfully",
                });
              }
            );
          });
        }
        if (!match) {
          logger.info(   JSON.stringify( {method: 'POST', route:'/resetpassword', info:"Wrong password" } ));
          res.status(401).send({
            auth: false,
            message: "Wrong Password",
          });
        }
      });
    } else {
      logger.info(   JSON.stringify( {method: 'POST', route:'/resetpassword', info:"User doesnt exist" } ));
      res.status(400).send({
        auth: false,
        message: "User doesnt exist",
      });
    }
  });
};

//password reset because it has been forgoten

const getUserEmail = (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      logger.error(   JSON.stringify( {method: 'POST', route:'/forgotpassword', err: err} ));
      res.send(err).status(500);
    }
    console.log(result[0]);
    if (result.length > 0) {
      //we have found a matching email address
      const user = result[0];
      const email = user.email;

      const token = createToken(user);
      res.cookie("password_Reset_Token", token, {
        maxAge: 1200000,
        http: true,
        secure: true,
      });

      const path = `http://${site.hostname}:${site.port}/forgotpassword`;
      const link = path + "/" + token;
      console.log(link);

      //nodemailer

      ("use strict");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: "Sender", // sender address
          to: email, // list of receivers
          subject: "Password Reset", // Subject line
          text: link, // plain text body
          html: `<b>CLICK THIS LINK TO CHANGE YOUR PASSWORD: ${link} <br/> <br/>THIS LINK WILL EXPIRE AFTER 20 MINUTES </b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        logger.info(   JSON.stringify( {method: 'POST', route:'/forgotpassword', info: "Message sent:" + " " +info.messageId } ));

        res.send("Message sent");
      }

      main().catch(console.error);
    } else {

      logger.info(   JSON.stringify( {method: 'POST', route:'/forgotpassword', info: "User doesnt exist"} ));   

      res.status(401).send("User doesnt exist");
    }
  });
};

const renderChangePasswordPage = (req, res) => {
  const token = req.cookies["password_Reset_Token"];

  if (!token) {
    //if there is no token to verify user
    logger.info(   JSON.stringify( {method: 'GET', route:'/forgotpassword/:id', info: "Link expired"} ));   
    res.send("Link expired");
  }
  let validToken = "";

  if (token) {
    //if there is a token proceed
    validToken = verify(token, process.env.TOKEN_SECRET);

    if (validToken) {
      // console.log(validToken);
      //go ahead and change your password
      logger.info(   JSON.stringify( {method: 'GET', route:'/forgotpassword/:id', info: "Proceed with change of password"} ));  
      res.render("index", { email: validToken.email });
    }
  }
};

const changePassword = (req, res) => {
  const errors = validationResult(req);

  const token = req.cookies["password_Reset_Token"];
  // console.log(token);

  const validToken = verify(token, process.env.TOKEN_SECRET);
  // console.log(validToken);
  const email = validToken.email;

  if (!errors.isEmpty()) {
    // console.log(errors);
    logger.error(   JSON.stringify( {method: 'POST', route:'/forgotpassword/:id', err: errors.errors} ));  
    return res.render("index", {
      errors: errors.errors,
      email: validToken.email,
    });
    //return res.status(400).send({ errors: errors.array() });
  }

  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword;
  // console.log(password);
  console.log(confirmPassword);
  if (password !== confirmPassword) {

    logger.info(   JSON.stringify( {method: 'POST', route:'/forgotpassword/:id', info: "Passwords dont match"} ));  
    return res.render("index", { notMatch: true, email: validToken.email });

  } else {
    bcrypt.hash(password, 10).then((hash) => {
      db.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [hash, email],
        (err, result) => {
          if (err) {

            logger.error(   JSON.stringify( {method: 'POST', route:'/forgotpassword/:id', err: err} ));  
            res.status(401).send(err);

          } else {

            console.log(result);
            logger.info(   JSON.stringify( {method: 'POST', route:'/forgotpassword/:id', info: "Successfully changed password"} ));  
            res.render("success");

          }
        }
      );
    });
  }
};

module.exports = {
  logIn,
  getLogin,
  register,
  logOut,
  resetPassword,
  getUserEmail,
  renderChangePasswordPage,
  changePassword,
};
