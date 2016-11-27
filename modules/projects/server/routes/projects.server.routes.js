'use strict';

/**
 * Module dependencies
 */
var projectsPolicy = require('../policies/projects.server.policy'),
  projects = require('../controllers/projects.server.controller');

module.exports = function(app) {
  // Projects Routes
  // app.route('/api/projects').all(projectsPolicy.isAllowed)
  //   .get(projects.list)
  //   .post(projects.create);

  // app.route('/api/projects/:projectId').get(projectsPolicy.isAllowed)
  //   .get(projects.read);
  //   .put(projects.update)
  //   .delete(projects.delete);

  // // Finish by binding the Project middleware
  // app.param('projectId', projects.projectByID);
  app.route('/api/projects/retrieve').post(projects.read);
  app.route('/api/projects/list').post(projects.list);
  app.route('/api/projects/create').post(projects.create);
  app.route('/api/projects/update').post(projects.update);
  app.route('/api/projects/sendmail').post(projects.sendMail);
};
