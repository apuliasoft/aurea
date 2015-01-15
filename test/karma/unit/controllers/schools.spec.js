'use strict';

(function (jasmine, spyOn) {
    // Schools Controller Spec
    describe('Aurea controllers', function () {
        describe('SchoolsCtrl', function () {
            // Initialize mocks and controller
            var $controller, $httpBackend, SmartState, scope, SchoolsCtrl;

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

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function ($rootScope, _$controller_, _$httpBackend_, _SmartState_) {
                $controller = _$controller_;

                $httpBackend = _$httpBackend_;

                SmartState = _SmartState_;

                scope = $rootScope.$new();
            }));

            it('$scope.goToListSchools() should call SmartState.go with "all schools" param', function () {
                spyOn(SmartState, 'go');

                SchoolsCtrl = $controller('SchoolsCtrl', {
                    $scope: scope,
                    schools: [],
                    school: {}
                });

                // run controller
                scope.goToListSchools();

                // test SmartState.go is called with "all schools" param
                expect(SmartState.go).toHaveBeenCalledWith('all schools');
            });

            it('$scope.goToCreateSchool() should call SmartState.go with "create school" param', function () {
                spyOn(SmartState, 'go');

                SchoolsCtrl = $controller('SchoolsCtrl', {
                    $scope: scope,
                    schools: [],
                    school: {}
                });

                // run controller
                scope.goToCreateSchool();

                // test SmartState.go is called with "create school" param
                expect(SmartState.go).toHaveBeenCalledWith('create school');
            });

            it('$scope.goToEditSchool() should call SmartState.go with "edit school"' +
                ' and school id params', inject(function (School) {
                spyOn(SmartState, 'go');

                SchoolsCtrl = $controller('SchoolsCtrl', {
                    $scope: scope,
                    schools: [],
                    school: {}
                });

                // fixture object to edit
                var school = new School({
                    _id: '1234567890abcdef12345678'
                });

                // run controller
                scope.goToEditSchool(school);

                // test SmartState.go is called with "edit school" param
                expect(SmartState.go).toHaveBeenCalledWith('edit school', { schoolId: school._id });
            }));

            it('$scope.goToListComplexes() should call SmartState.go with "all complexes"' +
                ' and school id params', inject(function (School) {
                spyOn(SmartState, 'go');

                SchoolsCtrl = $controller('SchoolsCtrl', {
                    $scope: scope,
                    schools: [],
                    school: {}
                });

                // fixture object to edit
                var school = new School({
                    _id: '1234567890abcdef12345678'
                });

                // run controller
                scope.goToListComplexes(school);

                // test SmartState.go is called with "all complexes" param
                expect(SmartState.go).toHaveBeenCalledWith('all complexes', { schoolId: school._id });
            }));

//            it('$scope.save() should create a new valid school', inject(function (School) {
//
//                // set edit mode to false
//                $state.current.data.editMode = false;
//
//                // fixture to send in POST request
//                var postSchoolData = function () {
//                    return {
//                        name: 'Istituto Tecnico'
//                    };
//                };
//
//                // fixture expected from POST request
//                var responseSchoolData = function () {
//                    return {
//                        _id: '1234567890abcdef12345678',
//                        name: 'Istituto Tecnico',
//                        __v: 0
//                    };
//                };
//
//                // fixture mock form input values
//                scope.school = new School(postSchoolData());
//
//                // test post request is sent
//                $httpBackend.expectPOST('schools', postSchoolData()).respond(responseSchoolData());
//
//                // Run controller
//                scope.save();
//                $httpBackend.flush();
//
//                // test form input(s) are reset
//                expect(scope.school).toEqualData(new School({complexes: [
//                    {}
//                ]}));
//
//                // test URL location to new object
//                expect($location.path()).toBe('/scuole');
//            }));
//
//            it('$scope.save() should update a valid school', inject(function (School) {
//
//                // set edit mode to true
//                $state.current.data.editMode = true;
//
//                // fixture to send in PUT request
//                var putSchoolData = function () {
//                    return {
//                        _id: '1234567890abcdef12345678',
//                        name: 'Istituto Tecnico',
//                        __v: 0
//                    };
//                };
//
//                // fixture expected from PUT request
//                var responseSchoolData = function () {
//                    return {
//                        _id: '1234567890abcdef12345678',
//                        name: 'Liceo Scientifico',
//                        __v: 1
//                    };
//                };
//
//                // mock school object from form
//                var school = new School(putSchoolData());
//
//                // mock school in scope
//                scope.school = school;
//
//                // test PUT happens correctly
//                var urlRegex = new RegExp('schools/[0-9a-fA-F]{24}');
//                $httpBackend.expectPUT(urlRegex).respond(responseSchoolData());
//
//                // run controller
//                scope.save();
//                $httpBackend.flush();
//
//                // test URL location to new object
//                expect($location.path()).toBe('/scuole');
//
//            }));
//
//            it('$scope.remove() should delete a school', inject(function (School) {
//
//                // fixture to send in DELETE request
//                var school = new School({
//                    _id: '1234567890abcdef12345678'
//                });
//
//                // mock school in scope
//                scope.schools = [];
//                scope.schools.push(school);
//
//                // test expected DELETE request
//                var urlRegex = new RegExp('schools/[0-9a-fA-F]{24}');
//                $httpBackend.expectDELETE(urlRegex).respond(204);
//
//                // run controller
//                scope.remove(school);
//                $httpBackend.flush();
//
//                // test after successful delete URL location schools list
//                expect(scope.schools.length).toBe(0);
//                expect($location.path()).toBe('/scuole');
//
//            }));
        });
    });
}(window.jasmine, window.spyOn));