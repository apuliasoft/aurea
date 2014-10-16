'use strict';

angular.module('aurea.users')
    .controller('LoginCtrl', function ($scope, $rootScope, $http, $location, SmartState) {
        // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function () {
            $http.post('/login', {
                email: $scope.user.email,
                password: $scope.user.password
            })
                .success(function () {
                    // authentication OK
                    SmartState.go('home');
                })
                .error(function () {
                    $scope.loginerror = 'Autenticazione fallita.';
                });
        };
    });