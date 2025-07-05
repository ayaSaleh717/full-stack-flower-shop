const mysql = require('mysql2/promise');

// Create a connection to the database
const connection = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password:'2025',
  database: 'flower_shop' 
});



module.exports = connection;
