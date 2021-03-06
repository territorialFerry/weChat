var jwt = require('jwt-simple');
var secret = 'interwebs';
var messagesDB = require('./messageModel.js');
var utils = require('../config/utils.js');



module.exports = {

  rooms: function(req, res, next){
    var token = req.cookies.wechatToken;
    if (token === undefined){
      // redirect user to signin page if token does not exist
      res.redirect('http://localhost:3000/wechat/users/signin');
      return;
    }
    utils.grabRoomsData(req, res, next);
  }, 

  chat: function(req, res, next){

    var room = req.params.room
    var token = req.cookies.wechatToken;
    
    if (token === undefined){
      // redirect user to signin page if token does not exist
      res.redirect('http://localhost:3000/wechat/users/signin');
      return;
    }

    var username = jwt.decode(token, secret).username;

    // console.log('USERNAME: ', username);

    utils.retrieveMessages(req, res, next, room, username);



  }, 

  private: function(req, res, next){

  }
}
