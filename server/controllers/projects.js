const db = require("../config/database");
const logger = require("../logger");

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
        logger.error(   JSON.stringify( {method: 'POST', route:'/projects', err: err} ));
        res.send(err).status(500);
      } else {
        console.log(result);
        logger.info(  JSON.stringify( {method: 'POST', route:'/projects', info: 'Project posted sucessfully'} )    )
        res.status(200).send("Project posted successfully")
      }
    }
  );

 ;
};

const getAllProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      logger.error(  JSON.stringify( {method: 'GET', route:'/projects', err: err} )    )
      res.send(err).status(500);
    }else{
      logger.info(  JSON.stringify( {method: 'GET', route:'/projects', info:"All projects retrieved succesfully"} )    )
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
        logger.error(  JSON.stringify( {method: 'GET', route:'/project', err: err} )    )
        res.send("Failed to get project").status(500);
      }
      if (result) {
        logger.info(  JSON.stringify( {method: 'GET', route:'/project', info: "Successfully retrieved ONE project"} )    )
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
        logger.error(  JSON.stringify( {method: 'DELETE', route:'/project', err: err} )    )
        res.send("Something went wrong").status(500);
      }else{
        logger.info(  JSON.stringify( {method: 'GET', route:'/project', info: " ONE projet Successfully deleted"} ) )
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
    "UPDATE projects SET nameOfProject = ?, projectDescription = ? WHERE idprojects = ?",
    [title, description, projectId],
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(  JSON.stringify( {method: 'PUT', route:'/project', err: err} )    )
        res.status(500).send(err);
      }else{
        logger.info(  JSON.stringify( {method: 'PUT', route:'/project', info: "One project successfully updated"} )    )
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
