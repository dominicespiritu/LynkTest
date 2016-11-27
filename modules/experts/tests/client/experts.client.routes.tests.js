(function () {
  'use strict';

  describe('Experts Route Tests', function () {
    // Initialize global variables
    var $scope,
      ExpertsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ExpertsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ExpertsService = _ExpertsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('experts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/experts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ExpertsController,
          mockExpert;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('experts.view');
          $templateCache.put('modules/experts/client/views/view-expert.client.view.html', '');

          // create mock Expert
          mockExpert = new ExpertsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Expert Name'
          });

          // Initialize Controller
          ExpertsController = $controller('ExpertsController as vm', {
            $scope: $scope,
            expertResolve: mockExpert
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:expertId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.expertResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            expertId: 1
          })).toEqual('/experts/1');
        }));

        it('should attach an Expert to the controller scope', function () {
          expect($scope.vm.expert._id).toBe(mockExpert._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/experts/client/views/view-expert.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ExpertsController,
          mockExpert;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('experts.create');
          $templateCache.put('modules/experts/client/views/form-expert.client.view.html', '');

          // create mock Expert
          mockExpert = new ExpertsService();

          // Initialize Controller
          ExpertsController = $controller('ExpertsController as vm', {
            $scope: $scope,
            expertResolve: mockExpert
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.expertResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/experts/create');
        }));

        it('should attach an Expert to the controller scope', function () {
          expect($scope.vm.expert._id).toBe(mockExpert._id);
          expect($scope.vm.expert._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/experts/client/views/form-expert.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ExpertsController,
          mockExpert;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('experts.edit');
          $templateCache.put('modules/experts/client/views/form-expert.client.view.html', '');

          // create mock Expert
          mockExpert = new ExpertsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Expert Name'
          });

          // Initialize Controller
          ExpertsController = $controller('ExpertsController as vm', {
            $scope: $scope,
            expertResolve: mockExpert
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:expertId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.expertResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            expertId: 1
          })).toEqual('/experts/1/edit');
        }));

        it('should attach an Expert to the controller scope', function () {
          expect($scope.vm.expert._id).toBe(mockExpert._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/experts/client/views/form-expert.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
