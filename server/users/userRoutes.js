var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.checkAuth);
  app.post('/signup', userController.signup);
  app.get('/signinPage', userController.signinPage);
  app.get('/signupPage', userController.signupPage);
}