var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'localhost', 
  database: 'wechat', 
  user: 'root'
})

mysqlConnection.connect();

module.exports = mysqlConnection;