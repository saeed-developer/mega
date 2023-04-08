require('dotenv').config({path : './config/.env'})
const mysql = require('mysql2/promise');
module.exports.pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE 
  });