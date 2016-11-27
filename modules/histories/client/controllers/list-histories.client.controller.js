(function () {
  'use strict';

  angular
    .module('histories')
    .controller('HistoriesListController', HistoriesListController);

  HistoriesListController.$inject = ['HistoriesService', 'HistoryCrudService'];

  function HistoriesListController(HistoriesService, HistoryCrudService) {
    var vm = this;

    var promise = HistoryCrudService.list({});
    vm.histories = [];  
      promise.then(function(values) {
        console.log('success retrieve history');
        console.log(values);
        vm.histories = values;

		// var data = values;
		// vm.tableParams = new NgTableParams({}, { dataset: data});	

      }, function(reason) {
        console.log('Failed: ' + values);
      });

    // vm.histories = HistoriesService.query();
  }
}());
