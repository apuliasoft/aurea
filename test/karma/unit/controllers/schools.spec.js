'use strict';

(function () {
    // Schools Controller Spec
    describe('Aurea controllers', function () {
        describe('SchoolsCtrl', function () {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function () {
                jasmine.addMatchers({
                    toEqualData: function (expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('aurea'));

            // Initialize the controller and a mock scope
            var SchoolsCtrl,
                scope,
                $state,
                $stateParams,
                $httpBackend,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function ($controller, $rootScope, _$state_, _$stateParams_, _$httpBackend_, _$location_) {

                scope = $rootScope.$new();

                SchoolsCtrl = $controller('SchoolsCtrl', {
                    $scope: scope
                });

                $state = _$state_;

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('$scope.goToListSchools() should locate to list schools URL', function () {

                // run controller
                scope.goToListSchools();

                // test URL location to list
                expect($location.path()).toBe('/scuole');
            });

            it('$scope.goToCreateSchool() should locate to create school form URL', function () {

                // run controller
                scope.goToCreateSchool();

                // test URL location to create form
                expect($location.path()).toBe('/scuole/crea');
            });

            it('$scope.goToEditSchool() should locate to edit school form URL', inject(function (School) {

                // fixture object to edit
                var school = new School({
                    _id: '1234567890abcdef12345678'
                });

                // run controller
                scope.edit(school);

                // test URL location to view
                expect($location.path()).toBe('/scuole/' + school._id);
            }));

            it('$scope.goToEditSchool() should locate to list complexes form URL', inject(function (School) {

                // fixture object to edit
                var school = new School({
                    _id: '1234567890abcdef12345678'
                });

                // run controller
                scope.edit(school);

                // test URL location to view
                expect($location.path()).toBe('/scuole/' + school._id);
            }));

            it('$scope.find() should create an array with at least one school object ' +
                'fetched from XHR', function () {

                // fixture expected GET request
                var responseSchoolData = function () {
                    return [
                        {
                            _id: '1234567890abcdef12345678',
                            name: 'Istituto Tecnico',
                            __v: 0
                        }
                    ];
                };

                // test GET happens correctly
                $httpBackend.expectGET('schools').respond(responseSchoolData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.schools).toEqualData(responseSchoolData());

            });

            it('$scope.init() should create a void school object', function () {

                // set edit mode to false
                $state.current.data.editMode = false;

                // run controller
                scope.init();

                // test scope value
                expect(!!scope.school).toBe(true);
            });

            it('$scope.findOne() should create a school object ' +
                'fetched from XHR using a schoolId URL parameter', function () {

                // set edit mode to true
                $state.current.data.editMode = true;

                // fixture URL parament
                $stateParams.schoolId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseSchoolData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Istituto Tecnico',
                        __v: 0
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('schools/([0-9a-fA-F]{24})');
                $httpBackend.expectGET(urlRegex).respond(responseSchoolData());

                // run controller
                scope.init();
                $httpBackend.flush();

                // test scope value
                expect(scope.school).toEqualData(responseSchoolData());

            });

            it('$scope.save() should create a new valid school', inject(function (School) {

                // set edit mode to false
                $state.current.data.editMode = false;

                // fixture to send in POST request
                var postSchoolData = function () {
                    return {
                        name: 'Istituto Tecnico'
                    };
                };

                // fixture expected from POST request
                var responseSchoolData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Istituto Tecnico',
                        __v: 0
                    };
                };

                // fixture mock form input values
                scope.school = new School(postSchoolData());

                // test post request is sent
                $httpBackend.expectPOST('schools', postSchoolData()).respond(responseSchoolData());

                // Run controller
                scope.save();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.school).toEqualData(new School({complexes: [
                    {}
                ]}));

                // test URL location to new object
                expect($location.path()).toBe('/scuole');
            }));

            it('$scope.save() should update a valid school', inject(function (School) {

                // set edit mode to true
                $state.current.data.editMode = true;

                // fixture to send in PUT request
                var putSchoolData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Istituto Tecnico',
                        __v: 0
                    };
                };

                // fixture expected from PUT request
                var responseSchoolData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Liceo Scientifico',
                        __v: 1
                    };
                };

                // mock school object from form
                var school = new School(putSchoolData());

                // mock school in scope
                scope.school = school;

                // test PUT happens correctly
                var urlRegex = new RegExp('schools/[0-9a-fA-F]{24}');
                $httpBackend.expectPUT(urlRegex).respond(responseSchoolData());

                // run controller
                scope.save();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/scuole');

            }));

            it('$scope.remove() should delete a school', inject(function (School) {

                // fixture to send in DELETE request
                var school = new School({
                    _id: '1234567890abcdef12345678'
                });

                // mock school in scope
                scope.schools = [];
                scope.schools.push(school);

                // test expected DELETE request
                var urlRegex = new RegExp('schools/[0-9a-fA-F]{24}');
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