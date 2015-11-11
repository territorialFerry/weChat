module.exports = {
  signin: function(req, res, next){
    // logic for signing in
    // allow user to proceed to room page
    // or let them know that signing in didn't work
    res.render('signin');
  }, 

  signup: function(req, res, next){
    // logic for signing up
    // allow user to proceed to room page
    // or let them know that username was not valid
    res.render('signup');
  }, 

  checkAuth: function(req, res, next){

  }
}