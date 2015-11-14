var jwt = require('jwt-simple');
var secret = 'interwebs';
var utils = require('./config/utils.js');

var grabSocketDetails = function(socket, io){
  var preRoom = (socket.handshake.headers.referer.split('/'));
  var room = preRoom[preRoom.length-1];

  var token;
  var preToken = socket.handshake.headers.cookie;
  socket.handshake.headers.cookie.split('; ').forEach(function(cookie){
    if (cookie.indexOf('wechatToken') > -1){
      token = cookie.slice(12);
    }
  });

  var username = jwt.decode(token, secret).username;

  return {
    'room': room, 
    'username': username
  }
}

module.exports = {
  newJoin: function(socket, io){
    var message = grabSocketDetails(socket, io);

    console.log('USERNAME', message.username);
    console.log('ROOM', message.room);
    

    socket.join(message.room);
    io.to(message.room).emit('justJoined', message.username);
  },

  userLeave: function(socket, io){
    var message = grabSocketDetails(socket, io);

    console.log('USERNAME', message.username);
    console.log('ROOM', message.room);
    socket.on('disconnect', function(){
      console.log('user left');
      io.to(message.room).emit('justLeft', message.username);
    });
  }, 

  newMessage: function(socket,io){
    var message = grabSocketDetails(socket, io);

    console.log('USERNAME', message.username);
    console.log('ROOM', message.room);

    socket.on('chat', function(msg){
      console.log("MESSAGE: ", msg);
      utils.addMessage(message.username, message.room, msg);
      io.to(message.room).emit('chat', {
        'username': message.username, 
        'details': msg
      })
    });
  }
}