(function () {
  'use strict';

  // School Controller Spec
  describe('Aurea controllers', function () {

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
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        SchoolsController = $controller('SchoolsController', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

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

      it('$scope.findOne() should create an array with one school object fetched ' +
        'from XHR using a schoolId URL parameter', function () {
        // fixture URL parament
        $routeParams.schoolId = '525a8422f6d0f87f0e407a33';

        // fixture response object
        var testSchoolData = function () {
          return {
            name: 'Scuola Media Statale Giovanni Pascoli',
              complex: [{
            address: 'via Manzoni s.n.',
            zipCode: '70016',
            city: 'Noicattaro',
            province: 'BA'
          }]};
        };

        // test expected GET request with response object
        $httpBackend.expectGET(/school\/([0-9a-fA-F]{24})$/).respond(testSchoolData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.school).toEqualData(testSchoolData());

      });

      it('$scope.init() should create an array with one void school object', function() {
        // run controller
        scope.init();

        // test scope value
        expect(scope.school).toEqualData({
          name: '',
          complexes: [{}]
        });
      });

      it('$scope.addComplex should create a void complex object ' +
        'and add it to the school in the scope', function() {
        // init school in scope
        scope.school = {
          name: '',
          complexes: [{}]
        };

        // Run controller
        scope.addComplex();

        // test after successful adding
        expect(scope.school).toEqualData({
          name: '',
          complexes: [{},{}]
        });
      });

      it('$scope.removeComplex should delete a complex object' +
        'from the school in the scope', function() {
        // fixture rideshare
        scope.school = {
            name: '',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          };

        // Run controller
        scope.removeComplex(0);

        // test after successful adding
        expect(scope.school).toEqualData({
          name: '',
          complexes: []
        });
      });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function () {

        // fixture expected POST data
        var postSchoolData = function () {
          return {
            name: 'Scuola Media Statale Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          };
        };

        // fixture expected response data
        var responseSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: 'Scuola Media Statale Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          };
        };

        // fixture mock form input values
        scope.school = {
          name: 'Scuola Media Statale Giovanni Pascoli',
          complexes: [{
            address: 'via Manzoni s.n.',
            zipCode: '70016',
            city: 'Noicattaro',
            province: 'BA'
          }]
        };

        // test post request is sent
        $httpBackend.expectPOST('school', postSchoolData()).respond(responseSchoolData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.school).toEqualData({
          name: '',
          complexes: [{}]
        });

        // test URL location to new object
        expect($location.path()).toBe('/scuole/' + responseSchoolData()._id);
      });

      it('$scope.update() should update a valid school', inject(function (Schools) {

        // fixture rideshare
        var putSchoolData = function () {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Istituto Comprensivo Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }]
          };
        };

        // mock school object from form
        var school = new Schools(putSchoolData());

        // mock school in scope
        scope.school = school;

        // test PUT happens correctly
        $httpBackend.expectPUT(/school\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        // $httpBackend.expectPUT(/schools\/([0-9a-fA-F]{24})$/, putArticleData()).respond();
        /*
         Error: Expected PUT /schools\/([0-9a-fA-F]{24})$/ with different data
         EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!"}
         GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!","updated":[1383534772975]}
         */

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/scuole/' + putSchoolData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid schoolId' +
        'and remove the school from the scope', inject(function (Schools) {

        // fixture rideshare
        var school = new Schools({
          _id: '525a8422f6d0f87f0e407a33'
        });

        // mock rideshares in scope
        scope.schools = [];
        scope.schools.push(school);

        // test expected rideshare DELETE request
        $httpBackend.expectDELETE(/school\/([0-9a-fA-F]{24})$/).respond(204);

        // run controller
        scope.remove(school);
        $httpBackend.flush();

        // test after successful delete URL location schools list
        // expect($location.path()).toBe('/schools');
        expect(scope.schools.length).toBe(0);

      }));

    });

  });
}());