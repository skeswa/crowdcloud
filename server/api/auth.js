var passport            = require('passport');
var WindowsLiveStrategy = require('passport-windowslive');
var User                = require('../db').models.User;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findOne({ '_id': id })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err);
    });
});

var creds = ['0000000048168AED', '8fphAc4mpFTg1Mn09iHi3CvqczA9sf2c'];
passport.use(new WindowsLiveStrategy({
    clientID: creds[0],
    clientSecret: creds[1],
    callbackURL: 'http://127.0.0.1/api/auth/callback',
    passReqToCallback : true
  }, function(req, email, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'email' :  email }, function(err, user) {
      // In case of any error, return using the done method
      if (err) return done(err);
      // Username does not exist, log error & redirect back
      if (!user) {
        console.log('User Not Found with email', email);
        return done(null, false, req.flash('message', 'User Not found.'));                 
      }
      // User exists but wrong password, log the error 
      if (!isValidPassword(user, password)){
        console.log('Invalid Password');
        return done(null, false, 
            req.flash('message', 'Invalid Password'));
      }
      // User and password both match, return user from 
      // done method which will be treated like success
      return done(null, user);
    });
}));

module.exports = function(app) {

};