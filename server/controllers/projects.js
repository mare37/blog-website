const db = require("../config/database");

const postProject = (req, res) => {
  const projectName = req.body.projectTitle;
  const projectDescription = req.body.projectDescription;
  const date = req.body.dateAndTime.date;
  const time = req.body.dateAndTime.time;
  console.log(date);

  db.query(
    "INSERT INTO projects (nameOfproject, projectDescription, date,time) VALUES(?,?,?,?)",
    [projectName, projectDescription, date, time],
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
    res.send(result).status(200);
  });
};

const getOneproject = (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  db.query(
    "SELECT * FROM projects WHERE projects_id = ?",
    [projectId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Failed to get project");
      }
      if (result) {
        res.status(200).send(result);
      }
    }
  );
};

const deleteOneProject = (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM projects WHERE idprojects = ?",
    [id],
    (err, response) => {
      if (err) {
        console.log(err);
      }
      console.log(response);
    }
  );

  res.send("Project Deleted");
};

const updateOneProject = (req, res) => {
  const { projectId } = req.params;
  const title = req.body.projectTitle;
  const description = req.body.projectDescription;
  db.query(
    "UPDATE projects SET nameOfProject = ?, projectDescription = ? WHERE idprojects = ?",
    [title, description, projectId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result);
    }
  );
};

module.exports = {
  postProject,
  getAllProjects,
  getOneproject,
  deleteOneProject,
  updateOneProject,
};
