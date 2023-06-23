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
router.get("/", validateToken, getAllContacts);
router.put("/", validateToken,   changeReadStatus);
router.delete("/:id", validateToken,   deleteOneMesage);
router.delete("/",  validateToken,   deleteAllMessages);

module.exports = router;
