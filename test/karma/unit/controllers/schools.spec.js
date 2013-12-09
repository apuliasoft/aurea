(function () {
  'use strict';

  // School Controller Spec
  describe('MEAN controllers', function () {

    describe('SchoolsController', function () {

      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function () {
        this.addMatchers({
          toEqualData: function (expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      // Load the controllers module
      beforeEach(module('aurea'));

      // Initialize the controller and a mock scope
      var SchoolsController,
        scope,
        $httpBackend;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {

        scope = $rootScope.$new();

        SchoolsController = $controller('SchoolsController', {
          $scope: scope
        });

        $httpBackend = _$httpBackend_;

      }));

      it('$scope.find() should create an array with at least one school object ' +
        'fetched from XHR', function () {

        // test expected GET request
        $httpBackend.expectGET('school').respond([
          {
            name: 'Scuola Media Statale Giovanni Pascoli',
            complex: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          }
        ]);

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.schools).toEqualData([
          {
            name: 'Scuola Media Statale Giovanni Pascoli',
            complex: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          }
        ]);

      });

    });

  });

}());