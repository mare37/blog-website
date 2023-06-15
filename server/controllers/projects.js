const db = require("../config/database");
const logger = require("../logger");

const postProject = (req, res) => {
  const projectName = req.body.projectTitle;
  const projectDescription = req.body.projectDescription;
  const date = req.body.dateAndTime.date;
  const time = req.body.dateAndTime.time;
  console.log(date);

  console.log(req.body);

  const {
    projectBackground,
    projectChallenge,
    projectSolution,
    technicalFeatures,
    technologiesUsed,
  } = req.body;

  db.query(
    "INSERT INTO projects (nameOfproject, projectDescription,projectBackground,theChallenge,theSolution, technologies, date,time) VALUES(?,?,?,?,?,?,?,?)",
    [
      projectName,
      projectDescription,
      projectBackground,
      projectChallenge,
      projectSolution,
      technologiesUsed,
      date,
      time,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(
          JSON.stringify({ method: "POST", route: "/projects", err: err })
        );
        res.send(err).status(500);
      } else {
        console.log(result);
        logger.info(
          JSON.stringify({
            method: "POST",
            route: "/projects",
            info: "Project posted sucessfully",
          })
        );

        let i;
        for (i = 0; i < technicalFeatures.length; i++) {
          if (technicalFeatures[i] !== "") {
            db.query(
              "INSERT INTO technicalfeatures (fk_projects_id, technicalfeature) VALUES(?,?)",
              [result.insertId, technicalFeatures[i]],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                 // console.log(result);
                }
              }
            );
          }
        }

        res.status(200).send("Project posted successfully");
      }
    }
  );
};

const getAllProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      logger.error(
        JSON.stringify({ method: "GET", route: "/projects", err: err })
      );
      res.send(err).status(500);
    } else {
      logger.info(
        JSON.stringify({
          method: "GET",
          route: "/projects",
          info: "All projects retrieved succesfully",
        })
      );
      res.send(result).status(200);
    }
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
        logger.error(
          JSON.stringify({ method: "GET", route: "/project", err: err })
        );
        res.send("Failed to get project").status(500);
      }
      if (result) {
        
        let project = result;
       

        db.query("SELECT * FROM technicalfeatures WHERE fk_projects_id = ?", [projectId],(err,result)=>{
          if(err){
            console.log(err);
          }else{
            let projectFeatures = result;
           // console.log(result);
           const projectInformation = {project: project, projectFeatures:projectFeatures}
           console.log(projectInformation);

           res.status(200).send(projectInformation);

          }
        })

        logger.info(
          JSON.stringify({
            method: "GET",
            route: "/project",
            info: "Successfully retrieved ONE project",
          })
        );

       
      
      }
    }
  );
};

const deleteOneProject = (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM projects WHERE projects_id = ?",
    [id],
    (err, response) => {
      if (err) {
        console.log(err);
        logger.error(
          JSON.stringify({ method: "DELETE", route: "/project", err: err })
        );
        res.send("Something went wrong").status(500);
      } else {
        logger.info(
          JSON.stringify({
            method: "GET",
            route: "/project",
            info: " ONE projet Successfully deleted",
          })
        );
        res.send("One project Successfully deleted").status(200);
      }
    }
  );
};

const updateOneProject = (req, res) => {
  const { projectId } = req.params;
  const title = req.body.projectTitle;
  const description = req.body.projectDescription;
  db.query(
    "UPDATE projects SET nameOfProject = ?, projectDescription = ? WHERE projects_id = ?",
    [title, description, projectId],
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(
          JSON.stringify({ method: "PUT", route: "/project", err: err })
        );
        res.status(500).send(err);
      } else {
        logger.info(
          JSON.stringify({
            method: "PUT",
            route: "/project",
            info: "One project successfully updated",
          })
        );
        res.status(200).send(result);
      }
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
