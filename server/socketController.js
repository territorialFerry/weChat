var jwt = require('jwt-simple');
var secret = 'interwebs';
var utils = require('./config/utils.js');

// helper function that grabs socket room and username details
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

// setup of robotMessages

var starwarsRobot = [{
    'username': 'ron', 
    'details': 'Did you all check out the latest trailer??'
}, {
    'username': 'lauren', 
    'details': 'yah! that was crazy!'
}, {
    'username': 'lauren', 
    'details': "i can't wait for the movie!!"
}, {
    'username': 'ron', 
    'details': 'yeah, me neither!!'
}, {
    'username': 'ron', 
    'details': "what'd you think of the new lightsaber"
}, {
    'username': 'lauren', 
    'details': "I think it's pretty cool"
}, {
    'username': 'lauren', 
    'details': 'but i really want to know why it looks the way it does'
}, {
    'username': 'lauren', 
    'details': "like.. is there some backstory to its guard"
}, {
    'username': 'ron', 
    'details': 'mm, that makes sense'
}, {
    'username': 'ron', 
    'details': 'well, stoked!'
}, {
    'username': 'lauren', 
    'details': 'stoked!'
}]

var messageIndex = 0;
var inRoom = 0;
var ntval;

var sendRobot = function(socket, io){
  console.log("INROOM: ", inRoom);

  if (starwarsRobot[messageIndex] !== undefined) {
    console.log('MESSAGEOUT');
    io.to('starwars').emit('chat', {
      'username': starwarsRobot[messageIndex]['username'], 
      'details': starwarsRobot[messageIndex]['details']
    })
    messageIndex++
  } else {
    console.log('MESSAGEOUT');
    messageIndex = 0;
    io.to('starwars').emit('chat', {
      'username': starwarsRobot[messageIndex]['username'], 
      'details': starwarsRobot[messageIndex]['details']
    })
    messageIndex++;
  }
}

var startStream = function(socket, io){
  console.log('STARTSTREAM');
  ntval = setInterval(function(){
    sendRobot(socket, io);
  }, 1000);
}

var endStream = function(socket, io){
  console.log('ENDSTREAM');
  clearInterval(ntval);
}




module.exports = {
  newJoin: function(socket, io){
    var message = grabSocketDetails(socket, io);

    socket.join(message.room);
    io.to(message.room).emit('justJoined', message.username);
    
    if (message.room === 'starwars'){
      inRoom++;
      if (inRoom === 1){
        startStream(socket, io);
      }
    }
  },

  userLeave: function(socket, io){
    var message = grabSocketDetails(socket, io);

    socket.on('disconnect', function(){
      console.log('user left');
      io.to(message.room).emit('justLeft', message.username);

      if (message.room === 'starwars'){
        inRoom = Math.max(0, inRoom - 1);
        if (inRoom === 0){
          endStream(socket, io);
        }
      }

    });
  }, 

  newMessage: function(socket,io){
    var message = grabSocketDetails(socket, io);

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
