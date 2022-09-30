const express = require("express");
const router = express.Router();
express.static("./public");
const cors = require("cors");
const db = require("../config/database");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

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
var storage2 = multer.diskStorage({
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

const uploadPhoto = multer({
  storage: storage,
});
const uploadResume = multer({
  storage: storage2,
});

const {
  postPhoto,
  getPhoto,
  postResume,
  getResume,
} = require("../controllers/photo-and-resume");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static("./public"));

//uploading one photo to public folder
router.post("/photo", uploadPhoto.single("image"), postPhoto);

//serving one photo to the front end using the public folder
router.get("/photo", getPhoto);

//uploading resume file to public folder
router.post("/resume", uploadResume.single("resume"), postResume);

//download resume to user computer
router.get("/resume", getResume);

module.exports = router;
