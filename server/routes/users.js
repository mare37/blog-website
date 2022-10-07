const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");
const { validateToken } = require("../JWT");
const { body, validationResult } = require("express-validator");
//const bodyParser = require("body-parser");

//router.use(express.static(__dirname + "./public"));

const {
  logIn,
  getLogin,
  register,
  logOut,
  resetPassword,
  getUserEmail,
  renderChangePasswordPage,
  changePassword,
} = require("../controllers/users");
//const { default: ChangePassword } = require("../../client/src/components/pages/changepassword/changepassword");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

//log into server
router.post("/api/login", logIn);

//get log in status to confirm if user is logged in
router.get("/api/login", validateToken, getLogin);

//change password
router.post("/api/resetpassword", resetPassword);

//get email from user and confirm if it exists in the database,
//create access token and email user the link
router.post("/api/forgotpassword", getUserEmail);

//if user clicks link and access token is valid render index.ejs,
//so that user can change password
router.get("/api/forgotpassword/:id", renderChangePasswordPage);

router.post(
  "/api/forgotpassword/:id",
  body("password").isLength({ min: 4 }),
  body("confirmpassword").isLength({ min: 4 }),
  changePassword
);

//register admin account
router.post("/api/register", register);

//log out
router.get("/api/logout", logOut);

module.exports = router;
