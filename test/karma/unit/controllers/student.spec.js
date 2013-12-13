(function () {
  'use strict';

  // School Controller Spec
  describe('Aurea controllers', function () {

    describe('StudentsController', function () {

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
      var StudentsController,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        StudentsController = $controller('StudentsController', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one student object ' +
        'fetched from XHR', function () {

        // test expected GET request
        $httpBackend.expectGET('student').respond([
          {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          }
        ]);

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.students).toEqualData([
          {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          }
        ]);

      });

      it('$scope.findOne() should create an array with one student object fetched ' +
        'from XHR using a studentId URL parameter', function () {
        // fixture URL parament
        $routeParams.studentId = '525a8422f6d0f87f0e407a33';

        // fixture response object
        var testStudentData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          };
        };

        // test expected GET request with response object
        $httpBackend.expectGET(/student\/([0-9a-fA-F]{24})$/).respond(testStudentData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.student).toEqualData(testStudentData());

      });

      it('$scope.init() should create an array with one void student object', function() {
        // run controller
        scope.init();

        // test scope value
        expect(scope.student).toEqualData({
          firstName: '',
          lastName: '',
          birthday: ''
        });

      });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function () {

        // fixture expected POST data
        var postStudentData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          };
        };

        // fixture expected response data
        var responseStudentData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          };
        };

        // fixture mock form input values
        scope.student = {
          firstName: 'Jhon',
          lastName: 'Doe',
          birthday: '1970-01-01'
        };

        // test post request is sent
        $httpBackend.expectPOST('student', postStudentData()).respond(responseStudentData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.student).toEqualData({
          firstName: '',
          lastName: '',
          birthday: ''
        });

        // test URL location to new object
        expect($location.path()).toBe('/alunni/' + responseStudentData()._id);

      });

      it('$scope.update() should update a valid student', inject(function (Students) {

        // fixture rideshare
        var putStudentData = function () {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            firstName: 'Jhon',
            lastName: 'Doe',
            birthday: '1970-01-01'
          };
        };

        // mock student object from form
        var student = new Students(putStudentData());

        // mock student in scope
        scope.student = student;

        // test PUT happens correctly
        $httpBackend.expectPUT(/student\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        // $httpBackend.expectPUT(/students\/([0-9a-fA-F]{24})$/, putArticleData()).respond();
        /*
         Error: Expected PUT /students\/([0-9a-fA-F]{24})$/ with different data
         EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!"}
         GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Article about MEAN","to":"MEAN is great!","updated":[1383534772975]}
         */

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/alunni/' + putStudentData()._id);

      }));

    });

  });
}());