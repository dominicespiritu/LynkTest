(function () {
  'use strict';

  angular
    .module('experts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('experts', {
        abstract: true,
        url: '/experts',
        template: '<ui-view/>'
      })
      .state('experts.list', {
        url: '',
        templateUrl: 'modules/experts/client/views/list-experts.client.view.html',
        controller: 'ExpertsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Experts List'
        }
      })
      .state('experts.create', {
        url: '/create',
        templateUrl: 'modules/experts/client/views/form-expert.client.view.html',
        controller: 'ExpertsController',
        controllerAs: 'vm',
        resolve: {
          expertResolve: newExpert
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Experts Create'
        }
      })
      .state('experts.edit', {
        url: '/:expertId/edit',
        templateUrl: 'modules/experts/client/views/form-expert.client.view.html',
        controller: 'ExpertsController',
        controllerAs: 'vm',
        resolve: {
          expertResolve: getExpert
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Expert {{ expertResolve.name }}'
        }
      })
      .state('experts.view', {
        url: '/:expertId',
        templateUrl: 'modules/experts/client/views/view-expert.client.view.html',
        controller: 'ExpertsController',
        controllerAs: 'vm',
        resolve: {
          expertResolve: getExpert
        },
        data: {
          pageTitle: 'Expert {{ expertResolve.name }}'
        }
      });
  }

  getExpert.$inject = ['$stateParams', 'ExpertsService'];

  function getExpert($stateParams, ExpertsService) {
    return ExpertsService.get({
      expertId: $stateParams.expertId
    }).$promise;
  }

  newExpert.$inject = ['ExpertsService'];

  function newExpert(ExpertsService) {
    return new ExpertsService();
  }
}());
