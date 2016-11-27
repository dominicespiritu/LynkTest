'use strict';

/**
 * Module dependencies
 */
var expertsPolicy = require('../policies/experts.server.policy'),
  experts = require('../controllers/experts.server.controller');

module.exports = function(app) {
  // Experts Routes
  app.route('/api/experts').all(expertsPolicy.isAllowed)
    .get(experts.list)
    .post(experts.create);

  app.route('/api/experts/:expertId').all(expertsPolicy.isAllowed)
    .get(experts.read)
    .put(experts.update)
    .delete(experts.delete);

  // Finish by binding the Expert middleware
  app.param('expertId', experts.expertByID);
};
