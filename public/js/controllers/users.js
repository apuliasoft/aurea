'use strict';

angular.module('aurea.users')
    .controller('UsersCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, User) {
        $scope.global = Global;

        $scope.roles = [
            {label: 'Studente', value: 'student'},
            {label: 'Insegnante', value: 'teacher'},
            {label: 'Genitore', value: 'parent'},
            {label: 'Dirigente', value: 'manager'},
            {label: 'Amministratore', value: 'admin'}
        ];

        $scope.goToListUsers = function () {
            SmartState.go('all users');
        };

        $scope.goToCreateUser = function () {
            SmartState.go('create user');
        };

        $scope.goToEditUser = function (user) {
            SmartState.go('edit user', {userId: user._id});
        };

        $scope.goToViewUser = function (user) {
            SmartState.go('user by id', {userId: user._id});
        };

        $scope.find = function () {
            User.query().$promise
                .then(function (users) {
                    $scope.users = users;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica utente';
                findOne();
            } else {
                $scope.title = 'Nuovo utente';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var user = $scope.user;
                if ($state.current.data.editMode) {
                    update(user);
                } else {
                    create(user);
                }
            }
        };

        $scope.remove = function (user) {
            if (user) {
                user.$remove(function () {
                    _.remove($scope.users, user);
                    $mdToast.show({
                        template: '<md-toast>Utente cancellato</md-toast>',
                        hideDelay: 2000
                    });
                });
            }
        };

        var prepare = function () {
            $scope.user = new User({
                role: 'manager'
            });
        };

        var findOne = function () {
            User.get({
                userId: $stateParams.userId
            }).$promise
                .then(function (user) {
                    $scope.user = user;
                });
        };

        var create = function (user) {
            user.$save(function () {
                $scope.goToListUsers();
                $mdToast.show({
                    template: '<md-toast>Utente creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (user) {
            if (!user.updated) {
                user.updated = [];
            }
            user.updated.push(new Date().getTime());

            user.$update(function () {
                $scope.goToListUsers();
                $mdToast.show({
                    template: '<md-toast>Utente aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };
    });