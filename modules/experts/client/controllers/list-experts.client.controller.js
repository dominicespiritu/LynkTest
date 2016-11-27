(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertsListController', ExpertsListController);

  ExpertsListController.$inject = ['ExpertsService'];

  function ExpertsListController(ExpertsService) {
    var vm = this;

    vm.experts = ExpertsService.query();
  }
}());
