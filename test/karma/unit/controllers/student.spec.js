(function () {
  'use strict';

  // School Controller Spec
  describe('Aurea controllers', function () {

    describe('Student controller', function () {

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
      var StudentCtrl,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        StudentCtrl = $controller('StudentCtrl', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('should attach a list of label to the scope', function () {
        expect(scope.labels).toEqualData(['Nome', 'Cognome']);
      });

      it('should attach a list of column to the scope', function () {
        expect(scope.columns).toEqualData(['firstName', 'lastName']);
      });

      it('$scope.find() should create an array with at least one student object ' +
        'fetched from XHR', function () {

        // fixture expected GET request
        var responseStudentData = function() {
          return [{
              firstName: 'Jhon',
              lastName: 'Doe',
              birthDate: '2013-12-16T00:00:00.000Z'
            }];
        };

        // test GET happens correctly
        $httpBackend.expectGET('student').respond(responseStudentData());

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.students).toEqualData(responseStudentData());

      });

      it('$scope.findOne() should create an array with one student object fetched ' +
        'from XHR using a studentId URL parameter', function () {

        // fixture URL parament
        $routeParams.studentId = '525a8422f6d0f87f0e407a33';

        // fixture expected GET request
        var responseStudentData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthDate: '2013-12-16T00:00:00.000Z'
          };
        };

        // test GET happens correctly
        var urlRegex = new RegExp('student/([0-9a-fA-F]{24})');
        $httpBackend.expectGET(urlRegex).respond(responseStudentData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.student).toEqualData(responseStudentData());

      });

      it('$scope.init() should create an array with one void student object', function() {
        // run controller
        scope.init();

        // test scope value
        expect(scope.student).toEqualData({
          firstName: '',
          lastName: '',
          birthDate: ''
        });

      });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function () {

        // fixture to send in POST request
        var postStudentData = function () {
          return {
            firstName: 'Jhon',
            lastName: 'Doe',
            birthDate: '2013-12-16T00:00:00.000Z'
          };
        };

        // fixture expected from POST request
        var responseStudentData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            firstName: 'Jhon',
            lastName: 'Doe',
            birthDate: '2013-12-16T00:00:00.000Z'
          };
        };

        // fixture mock form input values
        scope.student = postStudentData();

        // test post request is sent
        $httpBackend.expectPOST('student', postStudentData()).respond(responseStudentData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.student).toEqualData({
          firstName: '',
          lastName: '',
          birthDate: ''
        });

        // test URL location to new object
        expect($location.path()).toBe('/alunni/' + responseStudentData()._id);

      });

      it('$scope.update() should update a valid student', inject(function (Student) {

        // fixture to send in PUT request
        var putStudentData = function () {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            firstName: 'Jhon',
            lastName: 'Doe',
            birthDate: '2013-12-16T00:00:00.000Z'
          };
        };

        // fixture expected from PUT request
        var responseStudentData = function() {
          return putStudentData();
        };

        // mock student object from form
        var student = new Student(putStudentData());

        // mock student in scope
        scope.student = student;

        // test PUT happens correctly
        var urlRegex = new RegExp('student/[0-9a-fA-F]{24}');
        $httpBackend.expectPUT(urlRegex).respond(responseStudentData());

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/alunni/' + responseStudentData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid studentId' +
        'and remove the student from the scope', inject(function (Student) {

        // fixture to send in DELETE request
        var student = new Student({
          _id: '525a8422f6d0f87f0e407a33'
        });

        // mock student in scope
        scope.students = [];
        scope.students.push(student);

        // test expected DELETE request
        var urlRegex = new RegExp('student/[0-9a-fA-F]{24}');
        $httpBackend.expectDELETE(urlRegex).respond(204);

        // run controller
        scope.remove(student);
        $httpBackend.flush();

        // test after successful delete URL location schools list
        expect(scope.students.length).toBe(0);

      }));

    });

  });
}());