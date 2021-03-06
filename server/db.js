var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://127.0.0.1/crowdcloud');

var User = mongoose.model('User', {
  name:           String,
  liveId:         String,
  cert:           String,
  picture:        String,
  monthlyCap:     Number,
  contributions:  Object
});

var Project = mongoose.model('Project', {
  creator:  {
    liveId:   String,
    name:     String,
    picture:  String,
  },
  currentUnitsPerDay: Number,
  targetUnitsPerDay:  Number,
  picture:            String,
  leadContributor:    {
    name:           String,
    picture:        String,
    unitsPerDay:    Number
  },
  backers:      Number,
  name:         String,
  description:  String,
  repo:         String,
  tags:         [ String ]
});

module.exports = {
  models: {
    User:           User,
    Project:        Project
  }
};