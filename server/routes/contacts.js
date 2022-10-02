const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../JWT");

const {
  postContact,
  getAllContacts,
  changeReadStatus,
  deleteOneMesage,
  deleteAllMessages,
} = require("../controllers/contacts");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", postContact);
router.get("/", getAllContacts);
router.put("/", changeReadStatus);
router.delete("/:id", deleteOneMesage);
router.delete("/", deleteAllMessages);

module.exports = router;
