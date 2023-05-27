const { response } = require("express");
const db = require("../config/database");
const logger = require('../logger');

const postContact = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber
  const message = req.body.message;
  const status = req.body.status;
  const date = req.body.dateAndTime.date;
  const time = req.body.dateAndTime.time;
  console.log(date);

  db.query(
    "INSERT INTO contactinfo (fullname,email,phonenumber,message,status,date,time) VALUES (?,?,?,?,?,?,?)",
    [fullName, email, phoneNumber.toString(), message, status, date, time],
    (err, result) => {
      if (err) {
        console.log(err);
        logger.error(   JSON.stringify( {method: 'POST', route:'/contact', err: err} ));  
        res.send(err).status(500);
      }else{

        logger.info(   JSON.stringify( {method: 'POST', route:'/contact', info: "contact message posted succesfully"} ));  
        res.send(result).status(200);

      }

     
    }
  );
};

const getAllContacts = (req, res) => {
  db.query("SELECT * FROM contactinfo", (err, result) => {
    if (err) {

      logger.error(   JSON.stringify( {method: 'GET', route:'/contact', err: err} ));  
      res.send(err).status(500);
    }else{
      
      logger.info(   JSON.stringify( {method: 'GET', route:'/contact', info: "Contacts retrieved succesfully"} )); 
      res.send(result).status(200);
    }
   
  });
};

const changeReadStatus = (req, res) => {
  const status = "read";
  const id = req.body.id;
  console.log(id);
  db.query(
    "UPDATE contactinfo SET status = ?  WHERE contactinfo_id = ?",
    [status, id],
    (err, response) => {
      if (err) {
       // console.log(err);
        logger.error(   JSON.stringify( {method: 'PUT', route:'/contact', err: err} ));  
        res.status(500).send(err);
      }else{
        logger.info(   JSON.stringify( {method: 'PUT', route:'/contact', info: "Read Status changed succesfully"} ));
        res.status(200).send(response);
      }
     
    }
  );
};

const deleteOneMesage = (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query(
    "DELETE FROM contactinfo WHERE contactinfo_id = ?",
    [id],
    (err, response) => {
      if (err) {

        logger.error(   JSON.stringify( {method: 'DELETE', route:'/contact/:id', err: err} ));
        res.status(500).send(err);

      }else{

        logger.info(   JSON.stringify( {method: 'DELETE', route:'/contact/:id', info: "Successfully deleted ONE message"} ));
        res.status(200).send(response);
      }
    
    }
  );
};

const deleteAllMessages = (req, res) => {
  db.query("DELETE FROM contactinfo", (err, response) => {
    if (err) {
      console.log(err);
      logger.error(   JSON.stringify( {method: 'DELETE', route:'/contact', err: err} ));
      
      res.status(500).send(err);
    }else{
      console.log(response);
      logger.info(   JSON.stringify( {method: 'DELETE', route:'/contact', info: "Successfully deleted ALL messages"} ));
      res.status(200).send(response);

    }
   
  });
};

module.exports = {
  postContact,
  getAllContacts,
  changeReadStatus,
  deleteOneMesage,
  deleteAllMessages,
};
