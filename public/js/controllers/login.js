'use strict';

angular.module('aurea.users')
    .controller('LoginCtrl', function ($scope, $http, $mdDialog, $mdToast, SmartState) {
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

        $scope.getInfo = function (event) {

            $mdDialog.show({
                controller: 'InfoCtrl',
                templateUrl: 'views/infoDialog.html',
                targetEvent: event
            })
                .then(function (account) {
                    if (account) {
                        $scope.user = {
                            email: account.email,
                            password: account.password
                        };
                    }
                });
        };
    })
    .controller('InfoCtrl', function ($scope, $mdDialog) {
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

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.setAccount = function (account) {
            $mdDialog.hide(account);
        };
    });