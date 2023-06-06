const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "mysql_db",
  user: "root",
  connectionLimit: 10,
  waitForConnections: true,
 // password: process.env.DATABASE_PASSWORD,
 
  password:"MYSQL_ROOT_PASSWORD",
  database: "websitedata",
  
});
















module.exports = db;
