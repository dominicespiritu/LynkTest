'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  nodemailer = require('nodemailer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Project
 */
exports.create = function(req, res) {
  var project = new Project(req.body);
  // project.user = req.user;
console.log(req.body);
console.log(req.user);
  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(project);
    }
  });
};

/**
 * Show the current Project
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  // var project = req.project ? req.project.toJSON() : {};
  var project = {};

  Project.findById(req.body._id, function (err, project) {
    User.findById(project.user, function (err, user) {
      console.log('------------user------------');
      console.log(user);
      project['user'] = user;
      console.log('------------project------------');
      console.log(project);
      res.jsonp(project);
    });
    
  });

};

/**
 * Update a Project
 */
exports.update = function(req, res) {
  // var project = new Project(req.body);

  // project = _.extend(project, req.body);
  console.log("-----------------------update project-----------------------");
  
  console.log("-----------------------retrieve first-----------------------");
  Project.findById(req.body._id, function (err, project) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
      console.log("-----------------------located project-----------------------");
      console.log(project);
      // Merge with changed values
      project = _.extend(project, req.body);
      console.log(project);

        // Save the updated document back to the database
        project.save(function (err, updated_project) {
            if (err) {
                res.status(500).send(err)
            }else{
              User.findById(updated_project.user, function (err, user) {                
                updated_project['user'] = user;
                res.jsonp(updated_project);
              });
            }
        });
    }
  });
};

/**
 * Delete an Project
 */
exports.delete = function(req, res) {
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(project);
    }
  });
};

/**
 * List of Projects
 */
exports.list = function(req, res) {
  Project.find().sort('-created').populate('user', 'displayName').exec(function(err, projects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(projects);
    }
  });
};

/**
 * Project middleware
 */
exports.projectByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Project is invalid .....'
    });
  }

  Project.findById(id).populate('user', 'displayName').exec(function (err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No Project with that identifier has been found'
      });
    }
    req.project = project;
    next();
  });
};

/**
 * Mail Sending
 */
exports.sendMail = function(req, res) {
  console.log(req.body);
  // Use Smtp Protocol to send Email
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "lynkapptest@gmail.com",
            pass: "secret54321"
        }
    });

    var mail = {
        from: "Lynk App <Lynk@mail.com>",
        to: "eric@lynkpeople.com",
        subject: "Project Status Update",
        text: req.body.message,
        html: "<p>" + req.body.message + "</p>"
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });


};

