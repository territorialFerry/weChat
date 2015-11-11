var userController = require('./userController.js');

module.exports = function(app){
  app.get('/signin', userController.signin);
  app.get('/signup', userController.signup);
}