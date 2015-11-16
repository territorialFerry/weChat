// Node requirements
var express = require('express');
var app = express();

var server = require('http').Server(app);

var socketController = require('./socketController.js');

// Handlebar requirement
var engines = require('consolidate');

// Handlebars Engine Setup
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Socket Connection
var io = require('socket.io')(server, {origins:'localhost:3000:* http://localhost:3000:* http://www.localhost:3000:*'});

io.sockets.on('connection', function(socket){
  socketController.newJoin(socket, io);
  socketController.userLeave(socket, io);
  socketController.newMessage(socket, io);
});

// Middleware requirement
require('./config/middleware.js')(app, express);

// Export the server
module.exports = server;
