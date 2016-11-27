(function () {
  'use strict';

  angular
    .module('projects')
    .controller('ProjectsListController', ProjectsListController);

  ProjectsListController.$inject = ['ProjectsService', 'ProjectCrudService'];

  function ProjectsListController(ProjectsService, ProjectCrudService) {
    var vm = this;
    // console.log(ProjectCrudService.list);
    var promise = ProjectCrudService.list({});
    vm.projects = [];  
      promise.then(function(values) {
        console.log('success retrieve');
        vm.projects = values;
      }, function(reason) {
        console.log('Failed: ' + values);
      });
    // vm.projects = ProjectsService.query();
    
  }
}());
