const db = require("../config/database");

const multer = require("multer");

const postPhoto = (req, res) => {
  if (!req.file) {
    console.log("No upload");
    res.send("No upload");
  } else {
    db.query(
      "DELETE FROM photoandresume WHERE id = ?",
      [1],
      (err, response) => {
        if (err) {
          console.log(err);
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
          res.status(400).send(err);
        }else{

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
      }

     // const imagedata = Buffer.from(response[0].item, "base64");

     

      res.send(response);

      // res.send(response);
    }
  );
};



const postResume = (req, res) => {
 // resumeName = req.file.filename;

  if (!req.file) {
    console.log("No upload");
    res.send("No upload");
  } else {
    db.query(
      "DELETE FROM photoandresume WHERE id = ?",
      [2],
      (err, response) => {
        if (err) {
          console.log(err);
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
          res.status(400).send(err);
        }
        res.send("Resume Successfully Uploaded");
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
      //  console.log(err);
      }

      res.download(
        `C:/Users/TEDDY/Desktop/blog-website/client/public/images/${response[0].item}`,
        "resume.docx",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      res.status(200);



    }
  );

 
};

module.exports = { postPhoto, getPhoto, postResume, getResume };
