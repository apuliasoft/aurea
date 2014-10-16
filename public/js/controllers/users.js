'use strict';

angular.module('aurea.users')
    .controller('UsersCtrl', function ($scope, $stateParams, SmartState, _, ngToast, Global, User) {
        $scope.global = Global;

        $scope.columns = [
            { name: 'name', label: 'Nome' },
            { name: 'username', label: 'Username' },
            { name: 'email', label: 'Email' }
        ];

        $scope.roles = {
            student: 'Studente',
            teacher: 'Insegnante',
            parent: 'Genitore',
            manager: 'Dirigente',
            admin: 'Amministratore'
        };

        $scope.goToListUsers = function () {
            SmartState.go('all users');
        };

        $scope.goToCreateUser = function () {
            SmartState.go('create user');
        };

        $scope.goToEditUser = function (user) {
            SmartState.go('edit user', { userId: user._id });
        };

        $scope.goToViewUser = function (user) {
            SmartState.go('user by id', { userId: user._id });
        };

        $scope.init = function () {
            $scope.user = new User();
            $scope.user.school = Global.getSchool()._id;
            $scope.user.role = 'manager';
        };

        $scope.create = function () {
            var user = $scope.user;

            user.$save(function (response) {
                $scope.goToViewUser(response);
            });
        };

        $scope.remove = function (user) {
            if (user) {
                user.$remove();
                _.remove($scope.users, user);
                $scope.goToListUsers();
            }
        };

        $scope.update = function () {
            var user = $scope.user;

            if (!user.updated) {
                user.updated = [];
            }
            user.updated.push(new Date().getTime());

            user.$update(function (response) {
                $scope.goToViewUser(response);
            });
        };

        $scope.find = function () {
            $scope.users = User.query();
        };

        $scope.findOne = function () {
            $scope.user = User.get({
                userId: $stateParams.userId
            });
        };

    });