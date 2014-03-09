'use strict';

(function() {
    // Teachings Controller Spec
    describe('Aurea controllers', function() {
        describe('TeachingsCtrl', function() {
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
            var TeachingsCtrl,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                TeachingsCtrl = $controller('TeachingsCtrl', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.list() should locate to list teachings URL', function() {

                // run controller
                scope.list();

                // test URL location to list
                expect($location.path()).toBe('/insegnamenti');
            });

            it('$scope.new() should locate to create teaching form URL', function() {

                // run controller
                scope.new();

                // test URL location to create form
                expect($location.path()).toBe('/insegnamenti/crea');
            });

            it('$scope.view() should locate to view teaching URL', function() {

                // fixture object to view
                var viewTeachingData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.view(viewTeachingData());

                // test URL location to view
                expect($location.path()).toBe('/insegnamenti/' + viewTeachingData()._id);
            });

            it('$scope.edit() should locate to edit teaching form URL', function() {

                // fixture object to edit
                var editTeachingData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.edit(editTeachingData());

                // test URL location to view
                expect($location.path()).toBe('/insegnamenti/' + editTeachingData()._id + '/modifica');
            });

            it('$scope.find() should create an array with at least one teaching object ' +
                'fetched from XHR', function() {

                // fixture expected GET request
                var responseTeachingData = function() {
                    return [{
                        _id: '1234567890abcdef12345678',
                        name: 'Italiano',
                        __v: 0
                    }];
                };

                // test GET happens correctly
                $httpBackend.expectGET('teachings').respond(responseTeachingData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.teachings).toEqualData(responseTeachingData());

            });

            it('$scope.findOne() should create an array with one teaching object fetched ' +
                'from XHR using a teachingId URL parameter', function () {

                // fixture URL parameter
                $stateParams.teachingId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseTeachingData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Italiano',
                        __v: 0
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('teachings/([0-9a-fA-F]{24})');
                $httpBackend.expectGET(urlRegex).respond(responseTeachingData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.teaching).toEqualData(responseTeachingData());

            });

            it('$scope.init() should create an array with one void teaching object', function() {

                // run controller
                scope.init();

                // test scope value
                expect(!!scope.teaching).toBe(true);
            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', inject(function (Teaching) {

                // fixture to send in POST request
                var postTeachingData = function () {
                    return {
                        name: 'Italiano',
                    };
                };

                // fixture expected from POST request
                var responseTeachingData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Italiano',
                        __v: 0
                    };
                };

                // fixture mock form input values
                scope.teaching = new Teaching(postTeachingData());

                // test post request is sent
                $httpBackend.expectPOST('teachings', postTeachingData()).respond(responseTeachingData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.teaching).toEqualData(new Teaching());

                // test URL location to new object
                expect($location.path()).toBe('/insegnamenti/' + responseTeachingData()._id);
            }));

            it('$scope.update() should update a valid teaching', inject(function (Teaching) {

                // fixture to send in PUT request
                var putTeachingData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Italiano',
                        __v: 0
                    };
                };

                // fixture expected from PUT request
                var responseTeachingData = function() {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Matematica',
                        __v: 1
                    };
                };

                // mock teaching object from form
                var teaching = new Teaching(putTeachingData());

                // mock teaching in scope
                scope.teaching = teaching;

                // test PUT happens correctly
                var urlRegex = new RegExp('teachings/[0-9a-fA-F]{24}');
                $httpBackend.expectPUT(urlRegex).respond(responseTeachingData());

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/insegnamenti/' + responseTeachingData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid teachingId' +
                'and remove the teaching from the scope', inject(function (Teaching) {

                // fixture to send in DELETE request
                var teaching = new Teaching({
                    _id: '1234567890abcdef12345678'
                });

                // mock teaching in scope
                scope.teachings = [];
                scope.teachings.push(teaching);

                // test expected DELETE request
                var urlRegex = new RegExp('teachings/[0-9a-fA-F]{24}');
                $httpBackend.expectDELETE(urlRegex).respond(204);

                // run controller
                scope.remove(teaching);
                $httpBackend.flush();

                // test after successful delete URL location teachings list
                expect(scope.teachings.length).toBe(0);
                expect($location.path()).toBe('/insegnamenti');

            }));
        });
    });
}());