var fs    = require('fs');
var path  = require('path');

var LOGIN_HTML  = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'login.html'));
var APP_HTML    = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'app.html'));

module.exports = function(app) {
  app.get('/', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(APP_HTML);
  });

  app.get('/login', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(LOGIN_HTML);
  });
};