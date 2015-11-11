var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.checkAuth);
  app.get('/signin', userController.signin);
  app.get('/signup', userController.signup);
}