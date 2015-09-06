var fs    = require('fs');
var path  = require('path');

var LOGIN_HTML  = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'login.html'));
var APP_HTML    = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'app.html'));
var PROJECT_HTML = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'projects.html'));
var VIEW_HTML = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'view.html'));
var MYPROJECT_HTML = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'myprojects.html'));
var OWNPROJECT_HTML = fs.readFileSync(path.join(__dirname, '..', '..', 'client', 'html', 'ownproject.html'));

module.exports = function(app) {
  app.get('/', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(APP_HTML);
  });

  app.get('/login', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(LOGIN_HTML);
  });

  app.get('/projects', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(PROJECT_HTML);
  });

  app.get('/myprojects', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(MYPROJECT_HTML);
  });

  app.get('/view/:id', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(VIEW_HTML);
  });

  app.get('/myprojects/:id', function(req, res) {
    return res.status(200).set('Content-Type', 'text/html').send(OWNPROJECT_HTML);
  });
};
