var express = require('express');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var ArsenalFC = require('../models/playersModel');

var router = function(routes) {
  var link;


  routes.route('/upload')
  .post(function(req,res,next){
    res.json(req.files.thumbnail.path);
    link = req.files.thumbnail.path;
    next();
  })
  

  routes.route('/')
  .get(function (request, response) {
    ArsenalFC.find({}, 'name age jerseyNumber position numberOfGoals nationality rating link -_id', function (err, players) {
      if(err){
        return handleError(err);
      }
      response.json(players);
    });
  })
  .post(parseUrlencoded, function (request, response) {
    if(request.body.name) {
      ArsenalFC.create({
        name: request.body.name,
        age: request.body.age,
        jerseyNumber: request.body.jerseyNumber,
        position: request.body.position,
        numberOfGoals: request.body.numberOfGoals,
        country: request.body.nationality,
        rating: request.body.rating,
        link: link       
      }, 
      function (err, newPlayer) {
        if(err){
          return handleError(err);
        }
        console.log('New Player added...')
        response.json(newPlayer);
      });
    } else {
      response.status(400).json('Invalid Player name!!');
    }
  });

  routes.route('/:name')
  .put(parseUrlencoded, function (request, response) {
    if(request.body.name) {
      ArsenalFC.update({name: request.params.name}, { $set: { 
        name: request.body.name,
        age: request.body.age,
        jerseyNumber: request.body.jerseyNumber,
        position: request.body.position,
        numberOfGoals: request.body.numberOfGoals,
        country: request.body.nationality,
        rating: request.body.rating 
      }}, 
      function (err, editedPlayer) {
        if(err){
          return handleError(err);
        }
        response.json('changed ' + request.params.name + ' to ' + request.body.name);
      });
    } else {
      response.status(400).json('Invalid Player name!!');
    }
  })
  .delete(function (request, response) {
    ArsenalFC.remove({name: request.params.name}, function (err, deleted) {
      if(err){
        return handleError(err);
      }
      response.json('deleted ' + request.params.name);
    });
  })
  .get(function (request, response) {
    ArsenalFC.find({name: request.params.name}, 'name age jerseyNumber position numberOfGoals nationality rating -_id', function (err, player) {
      if(err){
        return handleError(err);
      }
      response.json(player);
    });
  });

}


module.exports = router;