const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../JWT");

const {
  postContact,
  getAllContacts,
  changeReadStatus,
  deleteOneMesage,
} = require("../controllers/contacts");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", postContact);
router.get("/", getAllContacts);
router.put("/", changeReadStatus);
router.delete("/", deleteOneMesage);

module.exports = router;
