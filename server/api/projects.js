var Project = require('../db').models.Project;
var protect = require('../util/protect');
var child = require('child_process');
var buildEmitter = require('../buildemitter');

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

    var query = { '_id': req.params['id'] };

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

  app.post('/api/projects/:id/back', function(req, res) {
    var proc = child.spawn('sh', ['./spawn-and-compute.sh'], []);
    proc.stdout.on('data', function(data){
      console.log("Standard out", data);
      buildEmitter.emit('build', {
        projectId:  req.params.id,
        data:       data
      });
    });
    proc.stderr.on('data', function (data) {
      buildEmitter.emit('build', {
        projectId:  req.params.id,
        data:       data,
        error:      true
      });
    });
    setInterval(function() {
      console.log("Set interval");
      buildEmitter.emit('cpu', {
        projectId:  req.params.id,
        data: ((15 + (Math.random() * 40)) + '%')
      });
    }, 500);
    return res.status(200).send();
  });
};
