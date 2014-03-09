'use strict';

(function() {
    // Teachers Controller Spec
    describe('Aurea controllers', function() {
        describe('TeachersCtrl', function() {
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
            var TeachersCtrl,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                TeachersCtrl = $controller('TeachersCtrl', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.list() should locate to list teachers URL', function() {

                // run controller
                scope.list();

                // test URL location to list
                expect($location.path()).toBe('/insegnanti');
            });

            it('$scope.new() should locate to create teacher form URL', function() {

                // run controller
                scope.new();

                // test URL location to create form
                expect($location.path()).toBe('/insegnanti/crea');
            });

            it('$scope.view() should locate to view teacher URL', function() {

                // fixture object to view
                var viewTeacherData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.view(viewTeacherData());

                // test URL location to view
                expect($location.path()).toBe('/insegnanti/' + viewTeacherData()._id);
            });

            it('$scope.edit() should locate to edit teacher form URL', function() {

                // fixture object to edit
                var editTeacherData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.edit(editTeacherData());

                // test URL location to view
                expect($location.path()).toBe('/insegnanti/' + editTeacherData()._id + '/modifica');
            });

            it('$scope.find() should create an array with at least one teacher object ' +
                'fetched from XHR', function() {

                // fixture expected GET request
                var responseTeacherData = function() {
                    return [{
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        __v: 1
                    }];
                };

                // test GET happens correctly
                $httpBackend.expectGET('teachers').respond(responseTeacherData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.teachers).toEqualData(responseTeacherData());

            });

            it('$scope.findOne() should create an array with one teacher object fetched ' +
                'from XHR using a teacherId URL parameter', function () {

                // fixture URL parameter
                $stateParams.teacherId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseTeacherData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        __v: 1
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('teachers/([0-9a-fA-F]{24})');
                $httpBackend.expectGET(urlRegex).respond(responseTeacherData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.teacher).toEqualData(responseTeacherData());

            });

            it('$scope.init() should create an array with one void teacher object', function() {

                // run controller
                scope.init();

                // test scope value
                expect(!!scope.teacher).toBe(true);
            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', inject(function (Teacher) {

                // fixture to send in POST request
                var postTeacherData = function () {
                    return {
                        firstName: 'Pinco',
                        lastName: 'Pallino'
                    };
                };

                // fixture expected from POST request
                var responseTeacherData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        __v: 1
                    };
                };

                // fixture mock form input values
                scope.teacher = new Teacher(postTeacherData());

                // test post request is sent
                $httpBackend.expectPOST('teachers', postTeacherData()).respond(responseTeacherData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.teacher).toEqualData(new Teacher());

                // test URL location to new object
                expect($location.path()).toBe('/insegnanti/' + responseTeacherData()._id);
            }));

            it('$scope.update() should update a valid teacher', inject(function (Teacher) {

                // fixture to send in PUT request
                var putTeacherData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        __v: 1
                    };
                };

                // fixture expected from PUT request
                var responseTeacherData = function() {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Abra',
                        lastName: 'Cadabra',
                        __v: 2
                    };
                };

                // mock teacher object from form
                var teacher = new Teacher(putTeacherData());

                // mock teacher in scope
                scope.teacher = teacher;

                // test PUT happens correctly
                var urlRegex = new RegExp('teachers/[0-9a-fA-F]{24}');
                $httpBackend.expectPUT(urlRegex).respond(responseTeacherData());

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/insegnanti/' + responseTeacherData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid teacherId' +
                'and remove the teacher from the scope', inject(function (Teacher) {

                // fixture to send in DELETE request
                var teacher = new Teacher({
                    _id: '1234567890abcdef12345678'
                });

                // mock teacher in scope
                scope.teachers = [];
                scope.teachers.push(teacher);

                // test expected DELETE request
                var urlRegex = new RegExp('teachers/[0-9a-fA-F]{24}');
                $httpBackend.expectDELETE(urlRegex).respond(204);

                // run controller
                scope.remove(teacher);
                $httpBackend.flush();

                // test after successful delete URL location teachers list
                expect(scope.teachers.length).toBe(0);
                expect($location.path()).toBe('/insegnanti');

            }));
        });
    });
}());