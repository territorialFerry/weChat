var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'localhost', 
  database: 'wechatUsers', 
  user: 'root'
})

mysqlConnection.connect();

module.exports = {
  mysqlDB: mysqlConnection, 
}