var usersDB = require('./userModel.js');
var utils = require('../config/utils.js');
var password = require('password-hash-and-salt');
var jwt = require('jwt-simple');
var secret = 'interwebs';

module.exports = {
  signinPage: function(req, res, next){
    // landing page
    res.render('landing');
  }, 

  signupPage: function(req, res, next){
    // signup page
    res.render('signup');
  }, 

  checkAuth: function(req, res, next){
    // checking to see if users are allowed on a certain page
    var payload = req.body;
    var username = req.body.username;
    var userPW = req.body.password; 

    // check if user exists
    usersDB.query("select * from userpassword where username = '" + username + "'", function(err, rows, fields){
      if (err){console.log(err)};

      // user does not exist in table
      if (rows.length === 0){
        res.render('landing', {
          'userNotValid': 'Sorry, that username does not exist',
          'username': username
        });
        return;
      } else {
        var databasePWHash = rows[0].password;

        // verify user-inputted password matches corresponding
        // password from database
        password(userPW).verifyAgainst(databasePWHash, function(error, verified){
          if(error)
              throw new Error('Something went wrong!');
          if(!verified) {
              console.log("Hacker!! We got you!");
              res.render('landing', {
                'username': username, 
                'passwordNotValid': 'Sorry, that password is not valid'
              })
              return;
          } else {
              console.log("You're in!!");
              
              var token = jwt.encode(payload, secret);
              res.cookie('wechatToken', token);
              utils.grabRoomData();
              res.render('rooms');
              return;
          }
        })
      }
    })
  }, 

  signup: function(req, res, next){
    // signing up a new user
    var payload = req.body;
    var username = req.body.username;
    var userPW = req.body.password;
    
    // verification of username and password length
    if (username.length < 3){
      res.render('signup', {
        'usernameLength': 'Sorry, username must be at least 3 characters long', 
        'username': username
      });
      return;
    } else if (username.length > 30){
      res.render('signup', {
        'usernameLength': 'Sorry, username must be less than 30 characters long', 
        'username': username
      });
      return;
    } else if (userPW.length < 8){
      res.render('signup', {
        'passwordLength': 'Sorry, password must be at least 8 characters long', 
        'username': username
      });
      return;
    }

    // query usersDB if username is already taken
    usersDB.query("select * from userpassword where username = '" + username + "'", function(err, rows, fields){
      if (err){console.log(err)}

      if (rows.length > 0){
        res.render('signup', {
          'username': username, 
          'taken': 'Sorry, that username is already taken'
        });
        return;
      } else {
        // hash password, insert into mysql database, set up
        // cookieand render rooms page
        password(userPW).hash(function(error, hashedPW){
          if (error){throw error}

          usersDB.query("insert into userpassword (username, password) values ('" + username + "', '" + hashedPW + "');", function(err, rows, fields){
            if (err){throw err}

            var token = jwt.encode(payload, secret);
            res.cookie('wechatToken', token);
            utils.grabRoomData();
            res.render('rooms');
            return;
          })
        })
      }
    });
  }
}