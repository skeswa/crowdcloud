var data = require('./data/projects.json');

module.exports = function(app) {
  app.get('/api/projects', function(req, res) {
    return res.status(200).json(data);
  });
};