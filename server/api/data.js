var fs      = require('fs');
var path    = require('path');
var Project = require('../db').Project;

var defaultProjectsData = require('./data/projects.json');

module.exports = function(app) {
  app.get('/data/reset', function(req, res) {
    Project.remove({})
      .then(Project.create(defaultProjectsData))
      .then(function() {
        return res.status(200).send();
      })
      .catch(function(err) {
        return res.status(200).send();
      });
    });
  });
};