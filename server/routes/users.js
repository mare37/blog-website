const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");
const { createToken, validateToken } = require("../JWT");
const bcrypt = require("bcrypt");
const { logIn, getLogin, register, logOut } = require("../controllers/users");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

//log into server
router.post("/api/login", logIn);

//get log in status to confirm if user is logged in
router.get("/api/login", validateToken, getLogin);

//register admin account
router.post("/api/register", validateToken, register);

//log out
router.get("/api/logout", logOut);

module.exports = router;
