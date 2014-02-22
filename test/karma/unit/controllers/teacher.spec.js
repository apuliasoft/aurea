(function () {
  'use strict';

  // School Controller Spec
  describe('Aurea controllers', function () {

    describe('Teacher controller', function () {

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
      var TeacherCtrl,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        TeacherCtrl = $controller('TeacherCtrl', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one teacher object ' +
        'fetched from XHR', function () {

        // test expected GET request
        $httpBackend.expectGET('teacher').respond([
          {
            firstName: 'Jhon',
            lastName: 'Doe'
          }
        ]);

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.teachers).toEqualData([
          {
            firstName: 'Jhon',
            lastName: 'Doe'
          }
        ]);

      });

      it('$scope.findOne() should create an array with one teacher object fetched ' +
        'from XHR using a teacherId URL parameter', function () {
        // fixture URL parament
        $routeParams.teacherId = '525a8422f6d0f87f0e407a33';

        // fixture response object
        var testTeacherData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe'
          };
        };

        // test expected GET request with response object
        $httpBackend.expectGET(/teacher\/([0-9a-fA-F]{24})$/).respond(testTeacherData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.teacher).toEqualData(testTeacherData());

      });

      it('$scope.init() should create an array with one void teacher object', function() {
        // run controller
        scope.init();

        // test scope value
        expect(scope.teacher).toEqualData({
          firstName: '',
          lastName: ''
        });

      });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function () {

        // fixture expected POST data
        var postTeacherData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe'
          };
        };

        // fixture expected response data
        var responseTeacherData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            firstName: 'Jhon',
            lastName: 'Doe'
          };
        };

        // fixture mock form input values
        scope.teacher = {
          firstName: 'Jhon',
          lastName: 'Doe'
        };

        // test post request is sent
        $httpBackend.expectPOST('teacher', postTeacherData()).respond(responseTeacherData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.teacher).toEqualData({
          firstName: '',
          lastName: ''
        });

        // test URL location to new object
        expect($location.path()).toBe('/insegnanti/' + responseTeacherData()._id);

      });

      it('$scope.update() should update a valid teacher', inject(function (Teacher) {

        // fixture rideshare
        var putTeacherData = function () {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            firstName: 'Jhon',
            lastName: 'Doe'
          };
        };

        // mock teacher object from form
        var teacher = new Teacher(putTeacherData());

        // mock teacher in scope
        scope.teacher = teacher;

        // test PUT happens correctly
        $httpBackend.expectPUT(/teacher\/([0-9a-fA-F]{24})$/).respond();

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/insegnanti/' + putTeacherData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid teacherId' +
        'and remove the teacher from the scope', inject(function (Teacher) {

        // fixture rideshare
        var teacher = new Teacher({
          _id: '525a8422f6d0f87f0e407a33'
        });

        // mock rideshares in scope
        scope.teachers = [];
        scope.teachers.push(teacher);

        // test expected rideshare DELETE request
        $httpBackend.expectDELETE(/teacher\/([0-9a-fA-F]{24})$/).respond(204);

        // run controller
        scope.remove(teacher);
        $httpBackend.flush();

        // test after successful delete URL location schools list
        //expect($location.path()).toBe('/insegnanti');
        expect(scope.teachers.length).toBe(0);

      }));

    });

  });
}());