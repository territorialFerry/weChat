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

      console.log("USERSPERROOM: ", usersPerRoom);

      res.render('rooms', {'usersPerRoom': usersPerRoom});
      return;

    })
  }, 

  retrieveMessages: function(req, res, next, room){
    messagesDB.query("select * from messages where room = '" + room + "';", function(err, rows, fields){
      if (err){console.log(error)};

      // console.log("ROWS: ", rows);
      // var socket = io();

      res.render('chat', {'messages': rows});
      return;
    })
  }, 

  addMessage: function(req, res, next){

  }
}