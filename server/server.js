var app = require('express')();
var server = require('http').Server(app);

app.get('/wechat', function(req, res){
  res.send('<h1>Hello world</h1>');
});

module.exports = server;