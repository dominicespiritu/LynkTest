(function () {
  'use strict';

  angular
    .module('experts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Experts',
    //   state: 'experts',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'experts', {
    //   title: 'List Experts',
    //   state: 'experts.list'
    // });

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'experts', {
    //   title: 'Create Expert',
    //   state: 'experts.create',
    //   roles: ['user']
    // });
  }
}());
