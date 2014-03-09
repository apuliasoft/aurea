'use strict';

(function() {
    // SchoolClasses Controller Spec
    describe('Aurea controllers', function() {
        describe('SchoolClassesCtrl', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('aurea'));

            // Initialize the controller and a mock scope
            var SchoolClassesCtrl,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                SchoolClassesCtrl = $controller('SchoolClassesCtrl', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.list() should locate to list school classes URL', function() {

                // run controller
                scope.list();

                // test URL location to list
                expect($location.path()).toBe('/classi');
            });

            it('$scope.new() should locate to create school class form URL', function() {

                // run controller
                scope.new();

                // test URL location to create form
                expect($location.path()).toBe('/classi/crea');
            });

            it('$scope.view() should locate to view school class URL', function() {

                // fixture object to view
                var viewSchoolClassData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.view(viewSchoolClassData());

                // test URL location to view
                expect($location.path()).toBe('/classi/' + viewSchoolClassData()._id);
            });

            it('$scope.edit() should locate to edit school class form URL', function() {

                // fixture object to edit
                var editSchoolClassData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.edit(editSchoolClassData());

                // test URL location to view
                expect($location.path()).toBe('/classi/' + editSchoolClassData()._id + '/modifica');
            });

            it('$scope.find() should create an array with at least one school class object ' +
                'fetched from XHR', function() {

                // fixture expected GET request
                var responseSchoolClassData = function() {
                    return [{
                        _id: '1234567890abcdef12345678',
                        name: '1A',
                        __v: 0
                    }];
                };

                // test GET happens correctly
                $httpBackend.expectGET('schoolClasses').respond(responseSchoolClassData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.schoolClasses).toEqualData(responseSchoolClassData());

            });

            it('$scope.findOne() should create an array with one school class object fetched ' +
                'from XHR using a schoolClassId URL parameter', function () {

                // fixture URL parameter
                $stateParams.schoolClassId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseSchoolClassData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: '1A',
                        __v: 0
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('schoolClasses/([0-9a-fA-F]{24})');
                $httpBackend.expectGET(urlRegex).respond(responseSchoolClassData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.schoolClass).toEqualData(responseSchoolClassData());

            });

            it('$scope.init() should create an array with one void school class object', function() {

                // run controller
                scope.init();

                // test scope value
                expect(!!scope.schoolClass).toBe(true);
            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', inject(function (SchoolClass) {

                // fixture to send in POST request
                var postSchoolClassData = function () {
                    return {
                        name: '1A',
                    };
                };

                // fixture expected from POST request
                var responseSchoolClassData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: '1A',
                        __v: 0
                    };
                };

                // fixture mock form input values
                scope.schoolClass = new SchoolClass(postSchoolClassData());

                // test post request is sent
                $httpBackend.expectPOST('schoolClasses', postSchoolClassData()).respond(responseSchoolClassData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.schoolClass).toEqualData(new SchoolClass());

                // test URL location to new object
                expect($location.path()).toBe('/classi/' + responseSchoolClassData()._id);
            }));

            it('$scope.update() should update a valid school class', inject(function (SchoolClass) {

                // fixture to send in PUT request
                var putSchoolClassData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: '1A',
                        __v: 0
                    };
                };

                // fixture expected from PUT request
                var responseSchoolClassData = function() {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: '2B',
                        __v: 1
                    };
                };

                // mock schoolClass object from form
                var schoolClass = new SchoolClass(putSchoolClassData());

                // mock schoolClass in scope
                scope.schoolClass = schoolClass;

                // test PUT happens correctly
                var urlRegex = new RegExp('schoolClasses/[0-9a-fA-F]{24}');
                $httpBackend.expectPUT(urlRegex).respond(responseSchoolClassData());

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/classi/' + responseSchoolClassData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid schoolClassId' +
                'and remove the schoolClass from the scope', inject(function (SchoolClass) {

                // fixture to send in DELETE request
                var schoolClass = new SchoolClass({
                    _id: '1234567890abcdef12345678'
                });

                // mock schoolClass in scope
                scope.schoolClasses = [];
                scope.schoolClasses.push(schoolClass);

                // test expected DELETE request
                var urlRegex = new RegExp('schoolClasses/[0-9a-fA-F]{24}');
                $httpBackend.expectDELETE(urlRegex).respond(204);

                // run controller
                scope.remove(schoolClass);
                $httpBackend.flush();

                // test after successful delete URL location schoolClasses list
                expect(scope.schoolClasses.length).toBe(0);
                expect($location.path()).toBe('/classi');

            }));
        });
    });
}());