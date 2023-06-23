const db = require("../config/database");
const logger = require("../logger");

const multer = require("multer");


const postPhoto = (req, res) => {
  if (!req.file) {

    console.log("No upload");
    logger.info(   JSON.stringify( {method: 'POST', route:'/photo', info: "Photo to upload doesnt exist"} ));

    res.send("No upload");
  } else {
    db.query(
      "DELETE FROM photoandresume WHERE id = ?",
      [1],
      (err, response) => {
        if (err) {
          console.log(err);
          logger.error(   JSON.stringify( {method: 'POST', route:'/photo', err: err} ));
          res.send("Something went wrong").status(500)
        }
        // console.log(response);
      }
    );

    db.query(
      "INSERT INTO photoandresume (id,item) VALUES (?,?)",
      [1, req.file.filename],

      (err, result) => {
        if (err) {
          console.log(err);
          logger.error(   JSON.stringify( {method: 'POST', route:'/photo', err: err} ));
          res.status(500).send(err);
        }else{

          logger.info(   JSON.stringify( {method: 'POST', route:'/photo', info: "Photo Successfully Uploaded"} ));

          res.send("Photo Successfully Uploaded");
        }
      
      }
    );
  }

  //  console.log(req.file);
  //console.log(req.body.data);
};

const getPhoto = (req, res) => {
  db.query(
    "SELECT * FROM photoandresume WHERE id = ?",
    [1],
    (err, response) => {
      if (err) {
        console.log(err);
        logger.error(   JSON.stringify( {method: 'GET', route:'/photo', err:err} ));
        res.send("Something went wrong").status(500)
      }else{
        logger.info(   JSON.stringify( {method: 'GET', route:'/photo', info:"Successfully retrieved photo"} ));
        res.send(response).status(200)

      }

     // const imagedata = Buffer.from(response[0].item, "base64");

     

     

      // res.send(response);
    }
  );
};



const postResume = (req, res) => {
 // resumeName = req.file.filename;

  if (!req.file) {
    console.log("No upload");
    logger.info(   JSON.stringify( {method: 'POST', route:'/resume', info: "Resume to upload doesnt exist"} ));
    res.send("No upload");
  } else {
    db.query(
      "DELETE FROM photoandresume WHERE id = ?",
      [2],
      (err, response) => {
        if (err) {
          console.log(err);
          logger.error(   JSON.stringify( {method: 'POST', route:'/resume', err: err} ));
          res.status(500).send(err);
        }
        // console.log(response);
      }
    );
    db.query(
      "INSERT INTO photoandresume (id,item) VALUES (?,?)",
      [2, req.file.filename],

      (err, result) => {
        if (err) {
          console.log(err);
          logger.error(   JSON.stringify( {method: 'POST', route:'/resume', err: err} ));
          res.status(500).send(err);
        }else{

          logger.info(   JSON.stringify( {method: 'POST', route:'/resume', info:"Resume Successfully Uploaded"} ));
          res.send("Resume Successfully Uploaded");
        }
       
      }
    );
  }




 // console.log(resumeName);
};

//let resumeName = "";

const getResume = (req, res) => {
  console.log("get resume");
 // console.log(resumeName);


  db.query(
    "SELECT * FROM photoandresume WHERE id = ?",
    [2],
    (err, response) => {
      if (err) {
        logger.error(   JSON.stringify( {method: 'GET', route:'/resume', err: err} ));
        res.send("Something went wrong").status(500);
      //  console.log(err);
      }else{


       
        res.download(
          `C:/Users/TEDDY/Desktop/blog-website/client/public/images/${response[0].item}`,
          "resume.docx",
          (err) => {
            if (err) {
              console.log(err);
              logger.error(   JSON.stringify( {method: 'GET', route:'/resume', err: err} ));
              res.send("Something went wrong").status(500);
              
            }else{

              logger.info(   JSON.stringify( {method: 'GET', route:'/resume', info:"Resume successfully downloaded"}
               ));
               res.status(200);
            }
          }
        );
        
      }

    



    }
  );

 
};

module.exports = { postPhoto, getPhoto, postResume, getResume };
