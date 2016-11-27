// Histories service used to communicate Histories REST endpoints
(function () {
  'use strict';

// Projects service used for communicating with the users REST endpoint
  angular
    .module('historycrud.services')
    .factory('HistoryCrudService', HistoryCrudService);

  HistoryCrudService.$inject = ['$resource'];

  function HistoryCrudService($resource) {
    var History = $resource('/api/history/:action', {}, {
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
        method: 'DELETE',
        url: '/update'
      },
      delete: {
        method: 'POST',
        url: '/delete'
      },
      list: {
        method: 'POST',
        params: {
          action: "list"
        }, 
        isArray: true
      }
    });

    return {
      create: function (history) {
        return History.create(history).$promise;
      },
      retrieve: function (history) {
        return History.retrieve(history).$promise;
      },
      update: function (history) {
        return History.update(history).$promise;
      },
      delete: function (history) {
        return History.delete(history).$promise;
      },
      list: function (history) {
        return History.list(history).$promise;
      }
    };
  }
// -----------------------------------------------------------------------------------------------------------------


  angular
    .module('histories')
    .factory('HistoriesService', HistoriesService);

  HistoriesService.$inject = ['$resource'];

  function HistoriesService($resource) {
    return $resource('api/histories/:historyId', {
      historyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
