const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joyjenny007@",
  database: "websitedata",
});

module.exports = db;
