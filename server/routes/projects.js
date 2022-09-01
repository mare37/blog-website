const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");
const { validateToken } = require("../JWT");
const {
  postProject,
  getAllProjects,
  getOneproject,
  deleteOneProject,
} = require("../controllers/projects");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

//post project to database
router.post("/", validateToken, postProject);

// get all projects from the database
router.get("/", getAllProjects);

//get one specific project from the database
router.get("/:projectId", getOneproject);
//delete one specific project from the database
router.delete("/", deleteOneProject);

module.exports = router;
