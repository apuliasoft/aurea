(function () {
  'use strict';

  // School Controller Spec
  describe('Aurea controllers', function () {

    describe('School controller', function () {

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
      var SchoolCtrl,
        scope,
        $httpBackend,
        $routeParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function ($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        SchoolCtrl = $controller('SchoolCtrl', {
          $scope: scope
        });

        $routeParams = _$routeParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('should attach a list of label to the scope', function () {
        expect(scope.labels).toEqualData(['Nome Istituto']);
      });

      it('should attach a list of column to the scope', function () {
        expect(scope.columns).toEqualData(['name']);
      });

      it('$scope.list() should locate to list schools URL', function() {

        // run controller
        scope.list();

        // test URL location to list
        expect($location.path()).toBe('/scuole');
      });

      it('$scope.new() should locate to create school form URL', function() {

        // run controller
        scope.new();

        // test URL location to create form
        expect($location.path()).toBe('/scuole/crea');
      });

      it('$scope.view() should locate to view school URL', function() {

        // fixture object to view
        var viewSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001'
          };
        };

        // run controller
        scope.view(viewSchoolData());

        // test URL location to view
        expect($location.path()).toBe('/scuole/' + viewSchoolData()._id);
      });

      it('$scope.edit() should locate to edit school form URL', function() {

        // fixture object to edit
        var editSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001'
          };
        };

        // run controller
        scope.edit(editSchoolData());

        // test URL location to view
        expect($location.path()).toBe('/scuole/' + editSchoolData()._id + '/modifica');
      });

      it('$scope.find() should create an array with at least one school object ' +
        'fetched from XHR', function () {

        // fixture expected GET request
        var responseSchoolData = function() {
          return [{
            _id: '525cf20451979dea2c000001',
            name: 'Scuola Media Statale Giovanni Pascoli',
            complex: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }],
            __v: 1
          }];
        };

        // test GET happens correctly
        $httpBackend.expectGET('school').respond(responseSchoolData());

        // run controller
        scope.find();
        $httpBackend.flush();

        // test scope value
        expect(scope.schools).toEqualData(responseSchoolData());

      });

      it('$scope.findOne() should create an array with one school object fetched ' +
        'from XHR using a schoolId URL parameter', function () {

        // fixture URL parament
        $routeParams.schoolId = '525cf20451979dea2c000001';

        // fixture expected GET request
        var responseSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: 'Scuola Media Statale Giovanni Pascoli',
            complex: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }],
            __v: 1
          };
        };

        // test GET happens correctly
        var urlRegex = new RegExp('school/([0-9a-fA-F]{24})');
        $httpBackend.expectGET(urlRegex).respond(responseSchoolData());

        // run controller
        scope.findOne();
        $httpBackend.flush();

        // test scope value
        expect(scope.school).toEqualData(responseSchoolData());

      });

      it('$scope.init() should create an array with one void school object', function() {

        // run controller
        scope.init();

        // test scope value
        expect(!!scope.school).toBe(true);
      });

      it('$scope.addComplex should create a void complex object ' +
        'and add it to the school in the scope', inject(function (School) {

        // init school in scope
        scope.school = new School({complexes:[]});

        // Run controller
        scope.addComplex();

        // test after successful adding
        expect(scope.school.complexes.length).toBe(1);
      }));

      it('$scope.removeComplex should delete a complex object ' +
        'from the school in the scope', inject(function (School) {

        var deleteComplexData = function () {
          return {
            address: 'via Manzoni s.n.',
            zipCode: '70016',
            city: 'Noicattaro',
            province: 'BA'
          };
        };

        // init school in scope
        scope.school = new School();
        scope.school.complexes = [];
        scope.school.complexes.push(deleteComplexData());

        // Run controller
        scope.removeComplex(deleteComplexData());

        // test after successful delete
        expect(scope.school.complexes.length).toBe(0);
      }));

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', inject(function (School) {

        // fixture to send in POST request
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

        // fixture expected from POST request
        var responseSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: 'Scuola Media Statale Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }],
            __v: 1
          };
        };

        // fixture mock form input values
        scope.school = new School(postSchoolData());

        // test post request is sent
        $httpBackend.expectPOST('school', postSchoolData()).respond(responseSchoolData());

        // Run controller
        scope.create();
        $httpBackend.flush();

        // test form input(s) are reset
        expect(scope.school).toEqualData(new School({complexes:[{}]}));

        // test URL location to new object
        expect($location.path()).toBe('/scuole/' + responseSchoolData()._id);
      }));

      it('$scope.update() should update a valid school', inject(function (School) {

        // fixture to send in PUT request
        var putSchoolData = function () {
          return {
            _id: '525cf20451979dea2c000001',
            name: 'Istituto Comprensivo Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }],
            __v: 1
          };
        };

        // fixture expected from PUT request
        var responseSchoolData = function() {
          return {
            _id: '525cf20451979dea2c000001',
            name: 'Istituto Comprensivo Giovanni Pascoli',
            complexes: [{
              address: 'via Manzoni s.n.',
              zipCode: '70016',
              city: 'Noicattaro',
              province: 'BA'
            }],
            __v: 2
          };
        };

        // mock school object from form
        var school = new School(putSchoolData());

        // mock school in scope
        scope.school = school;

        // test PUT happens correctly
        var urlRegex = new RegExp('school/[0-9a-fA-F]{24}');
        $httpBackend.expectPUT(urlRegex).respond(responseSchoolData());

        // run controller
        scope.update();
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/scuole/' + responseSchoolData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid schoolId' +
        'and remove the school from the scope', inject(function (School) {

        // fixture to send in DELETE request
        var school = new School({
          _id: '525cf20451979dea2c000001'
        });

        // mock school in scope
        scope.schools = [];
        scope.schools.push(school);

        // test expected DELETE request
        var urlRegex = new RegExp('school/[0-9a-fA-F]{24}');
        $httpBackend.expectDELETE(urlRegex).respond(204);

        // run controller
        scope.remove(school);
        $httpBackend.flush();

        // test after successful delete URL location schools list
        expect(scope.schools.length).toBe(0);
        expect($location.path()).toBe('/scuole');

      }));

    });

  });
}());