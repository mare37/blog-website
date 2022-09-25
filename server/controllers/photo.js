const db = require("../config/database");

const postPhoto = (req, res) => {
  console.log(req.file);
};

module.exports = { postPhoto };
