const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "mysql_db",
  user: "root",
  database: "websitedata",
  connectionLimit: 10,
  waitForConnections: true,
 // password: process.env.DATABASE_PASSWORD,
 //hello
 
  password:"MYSQL_ROOT_PASSWORD",
 
  
});


/*const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "websitedata",
  connectionLimit: 10,
  waitForConnections: true,
 // password: process.env.DATABASE_PASSWORD,
 
  password:"Joyjenny007@",
 
  
});*/
















module.exports = db;
