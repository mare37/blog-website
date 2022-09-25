const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { validateToken } = require("../JWT");

const { postPhoto } = require("../controllers/photo");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", upload.single("will"), postPhoto);

module.exports = router;
