(function () {
  'use strict';

  // Experts controller
  angular
    .module('experts')
    .controller('ExpertsController', ExpertsController);

  ExpertsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'expertResolve'];

  function ExpertsController ($scope, $state, $window, Authentication, expert) {
    var vm = this;

    vm.authentication = Authentication;
    vm.expert = expert;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Expert
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.expert.$remove($state.go('experts.list'));
      }
    }

    // Save Expert
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.expertForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.expert._id) {
        vm.expert.$update(successCallback, errorCallback);
      } else {
        vm.expert.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('experts.view', {
          expertId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
