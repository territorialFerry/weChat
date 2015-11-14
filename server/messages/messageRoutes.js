var messageController = require('./messageController.js');

module.exports = function(app){
  app.get('/', messageController.rooms);
  app.get('/:room', messageController.chat);
}