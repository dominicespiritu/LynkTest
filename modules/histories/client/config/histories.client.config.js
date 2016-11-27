(function () {
  'use strict';

  angular
    .module('histories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Histories',
      state: 'histories',
      type: 'dropdown'
      // roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'histories', {
      title: 'List Histories',
      state: 'histories.list'
    });

    // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'histories', {
    //   title: 'Create History',
    //   state: 'histories.create',
    //   roles: ['user']
    // });
  }
}());
