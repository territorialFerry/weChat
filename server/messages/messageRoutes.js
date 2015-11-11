var messageController = require('./messageController.js');

module.exports = function(app){
  app.get('/rooms', messageController.rooms);
  app.get('/rooms/:chat', messageController.chat);
}