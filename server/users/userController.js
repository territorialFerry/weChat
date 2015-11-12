var usersDB = require('./userModel.js');
var password = require('password-hash-and-salt');
var secret = 'interwebs';

module.exports = {
  signinPage: function(req, res, next){
    // logic for signing in
    // allow user to proceed to room page
    // or let them know that signing in didn't work
    res.render('signin');
  }, 

  signupPage: function(req, res, next){
    // logic for signing up
    // allow user to proceed to room page
    // or let them know that username was not valid
    res.render('signup');
  }, 

  checkAuth: function(req, res, next){
    // checking to see if users are allowed on a certain page



    console.log(req.body);
    console.log(req.connection.remoteAddress);
    res.render('rooms')
  }, 

  signup: function(req, res, next){
    // signing up a new user
    var username = req.body.username;
    var userPW = req.body.password;

    console.log("USERNAME: ", username);
    console.log("userPW: ", userPW);
    console.log("COOKIES: ", req.cookies);
    
    if (username.length < 8){
      res.render('signup', {
        'usernameLength': 'Sorry, username must be at least 8 characters long', 
        'username': username
      });
    } else if (userPW.length < 8){
      res.render('signup', {
        'passwordLength': 'Sorry, password must be at least 8 characters long', 
        'username': username
      });
    }

    // query usersDB is username is already taken
    usersDB.query("select * from userpassword where username = '" + username + "'", function(err, rows, fields){
      if (err){console.log(err)}

      if (rows.length > 0){
        res.render('signup', {
          'username': username, 
          'taken': 'Sorry, that username is already taken'
        });
      } else {
        // hash password, insert into mysql database, set up
        // cookieand render rooms page
        password(userPW).hash(function(error, hashedPW){
          if (error){throw error}

          usersDB.query("insert into userpassword (username, password) values ('" + username + "', '" + hashedPW + "');", function(err, rows, fields){
            if (err){throw err}
            res.cookie('wechatToken', 1234);
            res.render('rooms');
          })
        })
      }
    });


  }
}