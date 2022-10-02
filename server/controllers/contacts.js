const { response } = require("express");
const db = require("../config/database");

const postContact = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;
  const status = req.body.status;
  console.log(status);

  db.query(
    "INSERT INTO contactinfo (fullName,email,phoneNumber,message,status) VALUES (?,?,?,?,?)",
    [fullName, email, phoneNumber, message, status],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    }
  );
};

const getAllContacts = (req, res) => {
  db.query("SELECT * FROM contactinfo", (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const changeReadStatus = (req, res) => {
  const status = "read";
  const id = req.body.id;
  console.log(id);
  db.query(
    "UPDATE contactinfo SET status = ?  WHERE idcontactinfo = ?",
    [status, id],
    (err, response) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(response);
    }
  );
};

const deleteOneMesage = (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query(
    "DELETE FROM contactinfo WHERE idcontactinfo = ?",
    [id],
    (err, response) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(response);
    }
  );
};

const deleteAllMessages = (req, res) => {
  db.query("DELETE FROM contactinfo", (err, response) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    console.log(response);
    res.status(200).send(response);
  });
};

module.exports = {
  postContact,
  getAllContacts,
  changeReadStatus,
  deleteOneMesage,
  deleteAllMessages,
};
