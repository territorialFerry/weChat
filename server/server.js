// Node requirements
var app = require('express')();
var server = require('http').Server(app);

// Handlebar requirement
var engines = require('consolidate');

// Application View Engine Setup
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');



app.get('/wechat', function(req, res){
  res.send('<h1>Hello world</h1>');
});



module.exports = server;