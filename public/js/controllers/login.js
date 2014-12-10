'use strict';

angular.module('aurea.users')
    .controller('LoginCtrl', function ($scope, $http, $mdToast, SmartState) {
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
                    $mdToast.show({
                        template: '<md-toast>Autorizzato</md-toast>',
                        hideDelay: 2000
                    });
                    SmartState.go('home');
                })
                .error(function () {
                    $mdToast.show({
                        template: '<md-toast>Non autorizzato</md-toast>',
                        hideDelay: 2000
                    });
                });
        };
    });