'use strict';

(function() {
    // Users Controller Spec
    describe('Aurea controllers', function() {
        describe('UsersCtrl', function() {
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
            var UsersCtrl,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                UsersCtrl = $controller('UsersCtrl', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.list() should locate to list users URL', function() {

                // run controller
                scope.list();

                // test URL location to list
                expect($location.path()).toBe('/utenti');
            });

            it('$scope.new() should locate to create user form URL', function() {

                // run controller
                scope.new();

                // test URL location to create form
                expect($location.path()).toBe('/utenti/crea');
            });

            it('$scope.view() should locate to view user URL', function() {

                // fixture object to view
                var viewUserData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.view(viewUserData());

                // test URL location to view
                expect($location.path()).toBe('/utenti/' + viewUserData()._id);
            });

            it('$scope.edit() should locate to edit user form URL', function() {

                // fixture object to edit
                var editUserData = function () {
                    return {
                        _id: '525cf20451979dea2c000001'
                    };
                };

                // run controller
                scope.edit(editUserData());

                // test URL location to view
                expect($location.path()).toBe('/utenti/' + editUserData()._id + '/modifica');
            });

            it('$scope.find() should create an array with at least one user object ' +
                'fetched from XHR', function() {

                // fixture expected GET request
                var responseUserData = function() {
                    return [{
                        _id: '1234567890abcdef12345678',
                        name: 'Pinco Pallino',
                        email: 'pinco.pallino@email.com',
                        username: 'pinco.pallino',
                        role: ['manger'],
                        __v: 0
                    }];
                };

                // test GET happens correctly
                $httpBackend.expectGET('users').respond(responseUserData());

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.users).toEqualData(responseUserData());

            });

            it('$scope.findOne() should create an array with one user object fetched ' +
                'from XHR using a userId URL parameter', function () {

                // fixture URL parameter
                $stateParams.userId = '1234567890abcdef12345678';

                // fixture expected GET request
                var responseUserData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Pinco Pallino',
                        email: 'pinco.pallino@email.com',
                        username: 'pinco.pallino',
                        role: ['manger'],
                        __v: 0
                    };
                };

                // test GET happens correctly
                var urlRegex = new RegExp('users/([0-9a-fA-F]{24})');
                $httpBackend.expectGET(urlRegex).respond(responseUserData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.user).toEqualData(responseUserData());

            });

            it('$scope.init() should create an array with one void user object', function() {

                // run controller
                scope.init();

                // test scope value
                expect(!!scope.user).toBe(true);
            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', inject(function (User) {

                // fixture to send in POST request
                var postUserData = function () {
                    return {
                        name: 'Pinco Pallino',
                        email: 'pinco.pallino@email.com',
                        username: 'pinco.pallino',
                        role: ['manger'],
                    };
                };

                // fixture expected from POST request
                var responseUserData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Pinco Pallino',
                        email: 'pinco.pallino@email.com',
                        username: 'pinco.pallino',
                        role: ['manger'],
                        __v: 0
                    };
                };

                // fixture mock form input values
                scope.user = new User(postUserData());

                // test post request is sent
                $httpBackend.expectPOST('users', postUserData()).respond(responseUserData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.user).toEqualData(new User());

                // test URL location to new object
                expect($location.path()).toBe('/utenti/' + responseUserData()._id);
            }));

            it('$scope.update() should update a valid user', inject(function (User) {

                // fixture to send in PUT request
                var putUserData = function () {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Pinco Pallino',
                        email: 'pinco.pallino@email.com',
                        username: 'pinco.pallino',
                        role: ['manger'],
                        __v: 0
                    };
                };

                // fixture expected from PUT request
                var responseUserData = function() {
                    return {
                        _id: '1234567890abcdef12345678',
                        name: 'Abra Cadabra',
                        email: 'abra.cadabra@email.com',
                        username: 'abra.cadabra',
                        role: ['manger'],
                        __v: 1
                    };
                };

                // mock user object from form
                var user = new User(putUserData());

                // mock user in scope
                scope.user = user;

                // test PUT happens correctly
                var urlRegex = new RegExp('users/[0-9a-fA-F]{24}');
                $httpBackend.expectPUT(urlRegex).respond(responseUserData());

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/utenti/' + responseUserData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid userId' +
                'and remove the user from the scope', inject(function (User) {

                // fixture to send in DELETE request
                var user = new User({
                    _id: '1234567890abcdef12345678'
                });

                // mock user in scope
                scope.users = [];
                scope.users.push(user);

                // test expected DELETE request
                var urlRegex = new RegExp('users/[0-9a-fA-F]{24}');
                $httpBackend.expectDELETE(urlRegex).respond(204);

                // run controller
                scope.remove(user);
                $httpBackend.flush();

                // test after successful delete URL location users list
                expect(scope.users.length).toBe(0);
                expect($location.path()).toBe('/utenti');

            }));
        });
    });
}());