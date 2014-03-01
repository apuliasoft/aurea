(function () {
  'use strict';

  // AcademicYear Controller Spec
  describe('Aurea controllers', function () {

    describe('AcademicYear controller', function () {

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
      var AcademicYearCtrl,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        AcademicYearCtrl = $controller('AcademicYearCtrl', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('should attach a list of label to the scope', function () {
        expect(scope.labels).toEqualData(['Anno accademico', 'Data inizio', 'Data fine']);
      });

      it('should attach a list of column to the scope', function () {
        expect(scope.columns).toEqualData(['name', 'startDate', 'endDate']);
      });

      it('$scope.list() should locate to list academic year URL', function() {

        // run controller
        scope.list();

        // test URL location to list
        expect($location.path()).toBe('/aa');
      });

      it('$scope.new() should locate to create academic year URL', function() {

        // run controller
        scope.new();

        // test URL location to create form
        expect($location.path()).toBe('/aa/crea');
      });

      it('$scope.view() should locate to view academic year URL', function() {

        // fixture object to view
        var viewAcademicYearData = function () {
          return {
            _id: '525cf20451979dea2c000001'
          };
        };

        // run controller
        scope.view(viewAcademicYearData());

        // test URL location to view
        expect($location.path()).toBe('/aa/' + viewAcademicYearData()._id);
      });

      it('$scope.edit() should locate to edit academic year form URL', function() {

        // fixture object to edit
        var editAcademicYearData = function () {
          return {
            _id: '525cf20451979dea2c000001'
          };
        };

        // run controller
        scope.edit(editAcademicYearData());

        // test URL location to view
        expect($location.path()).toBe('/aa/' + editAcademicYearData()._id + '/modifica');
      });

      it('$scope.find() should create an array with at least one academic year object ' +
        'fetched from XHR', function () {

        // fixture expected GET request
        var responseAcademicYearData = function() {
          return [{
            _id: '525cf20451979dea2c000001',
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z',
            __v: 1
          }];
        };

        // test GET happens correctly
        $httpBackend.expectGET('academicYear').respond(responseAcademicYearData());

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.academicYears).toEqualData(responseAcademicYearData());

      });

      it('$scope.findOne() should create an array with one academic year object fetched ' +
        'from XHR using a academic yearId URL parameter', function () {

        // fixture URL parament
        $routeParams.academicYearId = '525cf20451979dea2c000001';

        // fixture expected GET request
        var responseAcademicYearData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z',
            __v: 1
          };
        };

        // test GET happens correctly
        var urlRegex = new RegExp('academicYear/([0-9a-fA-F]{24})');
        $httpBackend.expectGET(urlRegex).respond(responseAcademicYearData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.academicYear).toEqualData(responseAcademicYearData());

      });

      it('$scope.init() should create an array with one void academic year object', function() {

        // run controller
        scope.init();

        // test scope value
        expect(!!scope.academicYear).toBe(true);
      });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', inject(function (AcademicYear) {

        // fixture to send in POST request
        var postAcademicYearData = function () {
          return {
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z'
          };
        };

        // fixture expected from POST request
        var responseAcademicYearData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z',
            __v: 1
          };
        };

        // fixture mock form input values
        scope.academicYear = new AcademicYear(postAcademicYearData());

        // test post request is sent
        $httpBackend.expectPOST('academicYear', postAcademicYearData()).respond(responseAcademicYearData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.academicYear).toEqualData(new AcademicYear());

        // test URL location to new object
        expect($location.path()).toBe('/aa/' + responseAcademicYearData()._id);
      }));

      it('$scope.update() should update a valid academic year', inject(function (AcademicYear) {

        // fixture to send in PUT request
        var putAcademicYearData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z',
            __v: 1
          };
        };

        // fixture expected from PUT request
        var responseAcademicYearData = function() {
          return {
            _id: '525cf20451979dea2c000001',
            name: '2013/2014',
            startDate: '2013-9-1T00:00:00.000Z',
            endDate: '2014-8-31T00:00:00.000Z',
            __v: 2
          };
        };

        // mock academic year object from form
        var academicYear = new AcademicYear(putAcademicYearData());

        // mock academic year in scope
        scope.academicYear = academicYear;

        // test PUT happens correctly
        var urlRegex = new RegExp('academicYear/[0-9a-fA-F]{24}');
        $httpBackend.expectPUT(urlRegex).respond(responseAcademicYearData());

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/aa/' + responseAcademicYearData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid academicYearId' +
        'and remove the academic year from the scope', inject(function (AcademicYear) {

        // fixture to send in DELETE request
        var academicYear = new AcademicYear({
          _id: '525cf20451979dea2c000001'
        });

        // mock academic year in scope
        scope.academicYears = [];
        scope.academicYears.push(academicYear);

        // test expected DELETE request
        var urlRegex = new RegExp('academicYear/[0-9a-fA-F]{24}');
        $httpBackend.expectDELETE(urlRegex).respond(204);

        // run controller
        scope.remove(academicYear);
        $httpBackend.flush();

        // test after successful delete URL location academic years list
        expect(scope.academicYears.length).toBe(0);
        expect($location.path()).toBe('/aa');

      }));

    });

  });
}());