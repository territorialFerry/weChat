var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.checkAuth);
  app.post('/signup', userController.signup);
  app.get('/signup', userController.signupPage);
  app.get('/signin', userController.signinPage);
  app.post('/logout', userController.logout);
}