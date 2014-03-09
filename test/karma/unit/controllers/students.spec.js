'use strict';

(function() {
    // Students Controller Spec
    describe('Aurea controllers', function() {
        describe('StudentsCtrl', function() {
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
            var StudentsCtrl,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                StudentsCtrl = $controller('StudentsCtrl', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.list() should locate to list students URL', function() {

                // run controller
                scope.list();

                // test URL location to list
                expect($location.path()).toBe('/alunni');
            });

            it('$scope.new() should locate to create student form URL', function() {

                // run controller
                scope.new();

                // test URL location to create form
                expect($location.path()).toBe('/alunni/crea');
            });

            it('$scope.view() should locate to view student URL', function() {

                // fixture object to view
                var viewStudentData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.view(viewStudentData());

                // test URL location to view
                expect($location.path()).toBe('/alunni/' + viewStudentData()._id);
            });

            it('$scope.edit() should locate to edit student form URL', function() {

                // fixture object to edit
                var editStudentData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.edit(editStudentData());

                // test URL location to view
                expect($location.path()).toBe('/alunni/' + editStudentData()._id + '/modifica');
            });

            it('$scope.find() should create an array with at least one student object ' +
                'fetched from XHR', function() {

                // fixture expected GET request
                var responseStudentData = function() {
                    return [{
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000,
                        __v: 0
                    }];
                };

                // test GET happens correctly
                $httpBackend.expectGET('students').respond(responseStudentData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.students).toEqualData(responseStudentData());

            });

            it('$scope.findOne() should create an array with one student object fetched ' +
                'from XHR using a studentId URL parameter', function () {

                // fixture URL parameter
                $stateParams.studentId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseStudentData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000,
                        __v: 0
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('students/([0-9a-fA-F]{24})');
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
                expect(!!scope.student).toBe(true);
            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', inject(function (Student) {

                // fixture to send in POST request
                var postStudentData = function () {
                    return {
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000
                    };
                };

                // fixture expected from POST request
                var responseStudentData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000,
                        __v: 0
                    };
                };

                // fixture mock form input values
                scope.student = new Student(postStudentData());

                // test post request is sent
                $httpBackend.expectPOST('students', postStudentData()).respond(responseStudentData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.student).toEqualData(new Student());

                // test URL location to new object
                expect($location.path()).toBe('/alunni/' + responseStudentData()._id);
            }));

            it('$scope.update() should update a valid student', inject(function (Student) {

                // fixture to send in PUT request
                var putStudentData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Pinco',
                        lastName: 'Pallino',
                        birthDate: 1234567890000,
                        __v: 0
                    };
                };

                // fixture expected from PUT request
                var responseStudentData = function() {
                    return {
                        _id: '1234567890abcdef12345678',
                        firstName: 'Abra',
                        lastName: 'Cadabra',
                        birthDate: 2345678910000,
                        __v: 1
                    };
                };

                // mock student object from form
                var student = new Student(putStudentData());

                // mock student in scope
                scope.student = student;

                // test PUT happens correctly
                var urlRegex = new RegExp('students/[0-9a-fA-F]{24}');
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
                    _id: '1234567890abcdef12345678'
                });

                // mock student in scope
                scope.students = [];
                scope.students.push(student);

                // test expected DELETE request
                var urlRegex = new RegExp('students/[0-9a-fA-F]{24}');
                $httpBackend.expectDELETE(urlRegex).respond(204);

                // run controller
                scope.remove(student);
                $httpBackend.flush();

                // test after successful delete URL location students list
                expect(scope.students.length).toBe(0);
                expect($location.path()).toBe('/alunni');

            }));
        });
    });
}());