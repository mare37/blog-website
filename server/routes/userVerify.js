const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../JWT");
const axios = require("axios");
require("dotenv").config();

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", (req, res) => {
  const captchaToken = req.body.token;
  const secret = process.env.SITE_SECRET;

  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`
    )
    .then((response) => {
      if (response.status === 200) {
        res.send({ identity: "human" });
      } else {
        res.send({ identity: "robot" });
      }
    });
});

module.exports = router;
