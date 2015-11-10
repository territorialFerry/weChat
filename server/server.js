// Node requirements
var app = require('express')();
var server = require('http').Server(app);

// Handlebar requirement
var engines = require('consolidate');

// Application View Engine Setup
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Routes
app.get('/wechat', function(req, res, next){
  res.send('<h1>Hello world</h1>');
});

app.get('/wechat/signin', function(req, res, next){
  res.send('<h1>Hello signin</h1>');
});

app.get('/wechat/signup', function(req, res, next){
  res.send('<h1>Hello signup</h1>');
});

app.get('/wechat/rooms', function(req, res, next){
  res.send('<h1>Hello rooms</h1>');
});

app.get('/wechat/chat/:chat', function(req, res, next){
  var room = req.params.chat
  res.send('<h1>Hello ' + room + '</h1>');
});

// Export the server
module.exports = server;