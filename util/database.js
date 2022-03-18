const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'm7az7525jg6ygibs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'abvwb92qy4s8yg5t',
  database: 'g4sarl23yphqlsn0',
  password: 'wc5synhzoue9ucvo'
});

module.exports = pool.promise();