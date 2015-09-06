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

function createUser(profile, callback) {
  User.create({
    name:           profile.displayName,
    liveId:         profile.id,
    cert:           'this is a fake cert',
    picture:        'http://api.randomuser.me/portraits/men/10.jpg',
    monthlyCap:     120.00
  }, callback);
}

var creds = ['0000000048168AED', '8fphAc4mpFTg1Mn09iHi3CvqczA9sf2c'];

passport.use(new WindowsLiveStrategy({
    clientID: creds[0],
    clientSecret: creds[1],
    callbackURL: 'http://sandile.ngrok.com/api/auth/callback'
  }, function(accessToken, refreshToken, profile, done) {
    User.findOne({
      liveId: profile.id
    }).then(function(user) {
      if (!user) createUser(profile, done);
      else done(null, user);
    }).catch(function() {
      createUser(profile, done);
    });
}));

module.exports = function(app) {
  app.get('/api/authenticate', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }));

  app.get('/api/auth/callback', passport.authenticate('windowslive', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
};