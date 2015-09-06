var passport = require('passport');

module.exports = passport.authenticate('windowslive', {
  successRedirect: '/',
  failureRedirect: '/login'
});