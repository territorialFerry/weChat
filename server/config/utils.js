var messagesDB = require('../messages/messageModel.js');

module.exports = {
  grabRoomsData: function(req, res, next){
    messagesDB.query('select * from messages;', function(err, rows, fields){
      if (err){console.log(error)};

      var roomRef = {};
      
      rows.forEach(function(row){
        if (roomRef[row.room] === undefined){
          roomRef[row.room] = {};
          roomRef[row.room][row.username] = true;
        } else {
          roomRef[row.room][row.username] = true;
        }
      })

      var roomRefKeys = Object.keys(roomRef);
      var usersPerRoom = {};

      roomRefKeys.forEach(function(key){
        usersPerRoom[key] = Object.keys(roomRef[key]).length;
      })

      res.render('rooms', {'usersPerRoom': usersPerRoom});
      return;

    })
  }, 

  retrieveMessages: function(req, res, next, room, username){
    messagesDB.query("select * from messages where room = '" + room + "';", function(err, rows, fields){
      if (err){console.log(error)};

      res.render('chat', {
        'messages': rows, 
        'currentUser': username
      });
      return;
    })
  }, 

  addMessage: function(username, room, message){
    var msgInsert = "";

    for (var i = 0; i < message.length ; i++){
      if (message[i] === "'"){
        msgInsert += "\\'";
      } else {
        msgInsert += message[i];
      }
    }
    messagesDB.query("insert into messages (username, room, message) values ('" + username + "', '" + room + "', '" + msgInsert + "');");
  }
}