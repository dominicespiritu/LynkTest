// Experts service used to communicate Experts REST endpoints
(function () {
  'use strict';

  angular
    .module('experts')
    .factory('ExpertsService', ExpertsService);

  ExpertsService.$inject = ['$resource'];

  function ExpertsService($resource) {
    return $resource('api/experts/:expertId', {
      expertId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
