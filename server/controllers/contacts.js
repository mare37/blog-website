const db = require("../config/database");

const postContact = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;

  db.query(
    "INSERT INTO contactinfo (fullName,email,phoneNumber,message) VALUES (?,?,?,?)",
    [fullName, email, phoneNumber, message],
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

module.exports = { postContact, getAllContacts };
