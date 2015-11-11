// Node requirements
var express = require('express');
var app = express();
var server = require('http').Server(app);

// Handlebar requirement
var engines = require('consolidate');

// Handlebars Engine Setup
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Middleware requirement
require('./config/middleware.js')(app, express);

// Export the server
module.exports = server;