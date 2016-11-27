'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Expert = mongoose.model('Expert'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Expert
 */
exports.create = function(req, res) {
  var expert = new Expert(req.body);
  expert.user = req.user;

  expert.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(expert);
    }
  });
};

/**
 * Show the current Expert
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var expert = req.expert ? req.expert.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  expert.isCurrentUserOwner = req.user && expert.user && expert.user._id.toString() === req.user._id.toString();

  res.jsonp(expert);
};

/**
 * Update a Expert
 */
exports.update = function(req, res) {
  var expert = req.expert;

  expert = _.extend(expert, req.body);

  expert.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(expert);
    }
  });
};

/**
 * Delete an Expert
 */
exports.delete = function(req, res) {
  var expert = req.expert;

  expert.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(expert);
    }
  });
};

/**
 * List of Experts
 */
exports.list = function(req, res) {
  Expert.find().sort('-created').populate('user', 'displayName').exec(function(err, experts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(experts);
    }
  });
};

/**
 * Expert middleware
 */
exports.expertByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Expert is invalid'
    });
  }

  Expert.findById(id).populate('user', 'displayName').exec(function (err, expert) {
    if (err) {
      return next(err);
    } else if (!expert) {
      return res.status(404).send({
        message: 'No Expert with that identifier has been found'
      });
    }
    req.expert = expert;
    next();
  });
};
