var path        = require('path');
var express     = require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var session     = require('express-session');

// Server
var app       = express();

// Middleware
app.use(morgan('dev'));
app.use(session({
  secret: 'This is a shitty, very unsecret secret'
}));
app.use('/static', express.static(path.join('..', 'client')));
app.use('/api', bodyParser.json());
app.use('/api', bodyParser.urlencoded());

// Routes
require('./api/auth')(app);
require('./api/assets')(app);
require('./api/projects')(app);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) return console.error('Could not start server:', err);
  else return console.log('Server is listening on port', port);
});