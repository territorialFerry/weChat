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

    console.log('blah');
  }
}