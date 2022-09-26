const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static("./public"));

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
const { validateToken } = require("../JWT");

const { postPhoto } = require("../controllers/photo");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.post("/", upload.single("image"), (req, res) => {
  // if (!req.file) {

  //  }
  //  console.log(req.file);
  //console.log(req.body.data);

  console.log(req.file);
});

module.exports = router;
