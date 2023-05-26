const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
 // password: process.env.DATABASE_PASSWORD,
  password:"MYSQL_ROOT_PASSWORD",
  database: "websitedata",
});


db.connect( function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
})














module.exports = db;
