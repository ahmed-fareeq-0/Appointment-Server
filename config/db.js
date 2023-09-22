require('dotenv').config();
const mysql = require("mysql");


const pool = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

const connection = mysql.createConnection(pool);

connection.connect((err) => {
    if (err) {
        console.error("An error occurred while connecting to the database:", err);
      } else {
        console.log("Successfully connected to the database.");
      }
})

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     name: process.env.DB_NAME
// })

// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Successfully connected to the database." + connection.threadId);
// })

module.exports = connection;