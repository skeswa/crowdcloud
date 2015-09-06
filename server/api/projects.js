var Project = require('../db').models.Project;
var protect = require('../util/protect');

module.exports = function(app) {
  app.get('/api/projects', function(req, res) {
    var offset  = req.query.offset || 0;
    var limit   = req.query.limit || 20;
    var tag     = req.query.tag;

    var query;
    if (tag) {
      query = {};
      query.tags = { '$in': [ tag ] };
    }

    Project.find(query)
      .skip(offset)
      .limit(limit)
      .then(function(results) {
        return res.status(200).json(results);
      })
      .catch(function(err) {
        return res.status(500).send(err);
      });
  });

  app.get('/api/projects/:id', function(req, res) {
    var offset  = req.query.offset || 0;
    var limit   = req.query.limit || 20;
    var tag     = req.query.tag;

    var query = { '_id': req.params['_id'] };

    Project.findOne(query)
      .then(function(result) {
        return res.status(200).json(result);
      })
      .catch(function(err) {
        return res.status(500).send(err);
      }); 
  });

  app.get('/api/myprojects', function(req, res) {
    var query;
    if (req && req.session && req.session.user) {
      query = {
        'creator.liveId': req.session.user
      };
    } else {
      query = {
        'creator.name': { $regex: /.*Mcc.*/ }
      };
    }

    Project.find(query)
      .then(function(results) {
        return res.status(200).json(results);
      })
      .catch(function(err) {
        return res.status(500).send(err);
      }); 
  });
};