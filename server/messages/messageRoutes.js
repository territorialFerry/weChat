var messageController = require('./messageController.js');

module.exports = function(app){
  // app.post('/rooms', messageController.chatPage)
  app.get('/:room', messageController.chat);
}