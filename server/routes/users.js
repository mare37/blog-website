const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");
const { validateToken } = require("../JWT");

//router.use(express.static(__dirname + "./public"));

const {
  logIn,
  getLogin,
  register,
  logOut,
  resetPassword,
  recoverPassword,
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

//forgot password hence resetting
router.post("/api/forgotpassword", recoverPassword);

router.get("/api/forgotpassword/:id", changePassword);

//register admin account
router.post("/api/register", register);

//log out
router.get("/api/logout", logOut);

module.exports = router;
