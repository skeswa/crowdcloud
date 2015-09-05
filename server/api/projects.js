var data = require('./data/projects.json');

module.exports = function(app) {
  app.get('/api/projects', function(req, res) {
    return res.status(200).json(data);
  });

  app.get('/api/projects/:id', function(req, res) {
    var matches = data.filter(function(project) {
      return project._id === req.params.id;
    });

    if (!matches || matches.length < 1) {
      return res.status(404).send();
    } else {
      return res.status(200).json(matches[0]);
    }
  });
};