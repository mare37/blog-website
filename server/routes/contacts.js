const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../JWT");

const { postContact, getAllContacts } = require("../controllers/contacts");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", postContact);
router.get("/", getAllContacts);

module.exports = router;
