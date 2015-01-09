'use strict';

angular.module('aurea.users')
    .controller('LoginCtrl', function ($scope, $http, $mdToast, SmartState) {
        $scope.accounts = [
            {
                role: 'Dirigente',
                email: 'dirigente@demo.it',
                password: 'dirigenteDemo'
            },
            {
                role: 'Docente',
                email: 'docente@demo.it',
                password: 'docenteDemo'
            },
            {
                role: 'Studente',
                email: 'studente@demo.it',
                password: 'studenteDemo'
            },
            {
                role: 'Genitore',
                email: 'genitore@demo.it',
                password: 'genitoreDemo'
            }
        ];

        $scope.setCredentials = function (account) {
            $scope.user = {
                email: account.email,
                password: account.password
            };
        };

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