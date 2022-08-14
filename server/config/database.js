const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joyjenny007@",
  database: "websitedata",
});

module.exports = db;
