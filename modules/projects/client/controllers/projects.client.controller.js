(function () {
  'use strict';

  // Projects controller
  angular
    .module('projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'projectResolve', 'ProjectCrudService', 'HistoryCrudService', 'Notification'];

  function ProjectsController ($scope, $state, $window, Authentication, project, prjectCrud, HistoryService, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.project = project;
    vm.projectCrud = prjectCrud;
    vm.historyCrud = HistoryService;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.updateStatus = updateStatus;
    
    vm.project.startDate = new Date();
// console.log($state.current);
//     if($state.params){
//       console.log($state.params.projectId);
//       projects.view({ projectId: project._id })
//       $state.go('projects.view', {projectId: $state.params.projectId});
//     }
    // $state.go('where.ever.you.want.to.go', {stateParamKey: exampleParam});
    // Remove existing Project
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.project.$remove($state.go('projects.list'));
      }
    }

    vm.open2 = function() {
      vm.popup2.opened = true;
    };

    // Save Project
    function save(isValid) {
      console.log("save project...");
      console.log(vm.authentication);
      var experts = ["Product Expert", "Security Expert", "Sales Expert"];
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
        return false;
      }
      vm.project['status'] = "New";
      vm.project['experts'] = experts;
      vm.project['user'] = vm.authentication.user.id;
      // TODO: move create/update logic to service
      var promise = vm.projectCrud.create(vm.project);
      
      promise.then(function(value) {
        vm.project = value;
        console.log("success create");
        if (vm.project._id) {
          successCallback(vm.project);
        } else {
          errorCallback(vm.project);
        }
      }, function(reason) {
        console.log('Failed: ' + value);
      });

      function successCallback(res) {
        logHistory("SUCCESS", "CREATE");
        $state.go('projects.list');
      }
      function errorCallback(res) {
        logHistory("FAILED", "CREATE");
        vm.error = res.data.message;
      }
    }

    function updateStatus(status) {
      console.log('Approve project');
      // UPDATE PROJECT
      vm.project['status'] = status;
      vm.project['user'] = vm.authentication.user.id;
      var promise = vm.projectCrud.update(vm.project);

      promise.then(function(value) {
        vm.project = value;
        console.log("success create");
        if (vm.project._id) {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> ' + status + ' successful!' });
          sendMail("Project " + vm.project.name + " " + status);
          successCallback(vm.project);
        } else {
          errorCallback(vm.project);
        }
      }, function(reason) {
        console.log('Failed: ' + reason);
      });

      function successCallback(res) {
        logHistory("SUCCESS", status);
        // $state.go('projects.list');
      }
      function errorCallback(res) {
        logHistory("FAILED", status);
        vm.error = res.data.message;
      }

    }    

    function logHistory(status, action){
      // console.log(vm.project);
      // console.log(vm.authentication.user);
      // LOG HISTORY
      var history = {
        "name": status + " " + action + " Project",
        "project": vm.project._id,
        "user":vm.authentication.user.id
      };
      var historypromise = vm.historyCrud.create(history);
      historypromise.then(function(value) {

        // console.log("success create");
        if (vm.project._id) {
          // successCallback(vm.project);
        } else {
          // errorCallback(vm.project);
        }
      }, function(reason) {
        // console.log('Failed: ' + value);
      });
    }  

    function sendMail(message){
      var mailParams = {
        'message':message
      };
      var promise = vm.projectCrud.sendmail(mailParams);

      promise.then(function(value) {
        vm.project = value;
        console.log("success create");
        if (vm.project._id) {
          
        } else {
          
        }
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
    }  
  }
}());
