var messageController = require('./messageController.js');

module.exports = function(app){
  app.post('/rooms', messageController.chatPage)
  // app.get('/rooms', messageController.rooms);
  // app.get('/rooms/:chat', messageController.chat);
}