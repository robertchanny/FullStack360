var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../models/Profile');

function createErrorObject(msg){
  var error = {
    confirmation: 'fail',
    message: msg
  }
  return error;
}

function createResultObject(result){
  var results = {
    confirmation: 'success',
    result: result
  }
  return results;
}

router.post('/:resource', function(req,res,next) {
  var resource = req.params.resource;

  if (resource == 'profile'){
    Profile.create(req.body, function(err, profile){
      if(err) {
        res.send(createErrorObject(err.message));
        return;
      }

      res.send(createResultObject(profile.summary()));
      return;

    });
    return;
  }

  res.send(createErrorObject('Invalid Resource'));
  return

});

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;

  if (resource == 'profile'){

    Profile.find(req.query, function(err, profiles){
      
      if (err){
        res.send(createErrorObject(err.message));
        return;
      }

      if (profiles == null){
        res.send(createErrorObject('No Profiles found'));
        return;
      }

      var list = [];
      for (var i=0; i<profiles.length; i++){
        list.push(profiles[i]);
      }
      res.send(createResultObject(list));
      return;

    });
    return;
  }

  res.send(createErrorObject('Invalid Resource'));
  return;
});

router.get('/:resource/:id', function(req, res, next){

  var resource = req.params.resource;
  var id = req.params.id;

  if (resource == 'profile'){
    Profile.findById(id, function(err, profile){
      if (err || profile==null){
        res.send(createErrorObject('Profile not found'));
        return;
      }

      res.send(createResultObject(profile.summary()));
      return;

    });
    return;
  }

  res.send(createErrorObject('Invalid Resource'));
  return;

});

module.exports = router;