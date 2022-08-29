const db = require("../config/database");

const postProject = (req, res) => {
  const projectName = req.body.projectTitle;
  const projectDescription = req.body.projectDescription;

  db.query(
    "INSERT INTO projects (nameOfproject, projectDescription) VALUES(?,?)",
    [projectName, projectDescription],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );

  res.status(200).send("ok");
};

const getAllProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const getOneproject = (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  res.send(projectId);
};

module.exports = { postProject, getAllProjects, getOneproject };
