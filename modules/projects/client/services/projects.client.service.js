// Projects service used to communicate Projects REST endpoints
(function () {
  'use strict';

// Projects service used for communicating with the users REST endpoint
  angular
    .module('projectcrud.services')
    .factory('ProjectCrudService', ProjectCrudService);

  ProjectCrudService.$inject = ['$resource'];

  function ProjectCrudService($resource) {
    var Projects = $resource('/api/projects/:action', {}, {
      create: {
        method: 'POST',
        params: {
          action: "create"
        }, 
        isArray: false
      },
      retrieve: {
        method: 'POST',
        params: {
          action: "retrieve"
        }, 
        isArray: false
      },
      update: {
        method: 'POST',
        params: {
          action: "update"
        }, 
        isArray: false
      },
      delete: {
        method: 'POST',
        params: {
          action: "delete"
        }, 
        isArray: false
      },
      list: {
        method: 'POST',
        params: {
          action: "list"
        }, 
        isArray: true
      },
      sendmail: {
        method: 'POST',
        params: {
          action: "sendmail"
        }, 
        isArray: false
      }
    });

    return {
      create: function (params) {
        return Projects.create(params).$promise;
      },
      retrieve: function (project) {
        return Projects.retrieve(project).$promise;
      },
      update: function (project) {
        return Projects.update(project).$promise;
      },
      delete: function (project) {
        return Projects.delete(project).$promise;
      },
      list: function (project) {
        return Projects.list(project).$promise;
      },
      sendmail: function (project) {
        return Projects.sendmail(project).$promise;
      }
    };
  }
// -----------------------------------------------------------------------------------------------------------------

  angular
    .module('projects')
    .factory('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['$resource'];

  function ProjectsService($resource) {

    return $resource('api/projects/:projectId', {
      projectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
