const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");
const { createToken, validateToken } = require("../JWT");
const bcrypt = require("bcrypt");
const {
  logIn,
  getLogin,
  register,
  logOut,
  resetPassword,
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

//register admin account
router.post("/api/register", register);

//log out
router.get("/api/logout", logOut);

module.exports = router;
