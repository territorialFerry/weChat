var messagesDB = require('../messages/messageModel.js');

module.exports = {
  grabRoomData: function(req, res, next){
    messagesDB.query('select * from messages;', function(err, rows, fields){
      if (err){console.log(error)};

      console.log("ROWS: ", rows);
      console.log("FIELDS: ", fields);
    })
  }
}