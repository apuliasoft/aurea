'use strict';

angular.module('aurea.users').controller('UsersCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'User', function ($scope, $stateParams, $location, _, Global, User) {
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

    $scope.list = function () {
        $location.path('utenti');
    };

    $scope.new = function () {
        $location.path('utenti/crea');
    };

    $scope.view = function (user) {
        if (user) {
            $location.path('utenti/' + user._id);
        }
    };

    $scope.edit = function (user) {
        if (user) {
            $location.path('utenti/' + user._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.user = new User();
        $scope.user.role = 'student';
    };

    $scope.create = function () {
        var user = $scope.user;

        user.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function (user) {
        if (user) {
            user.$remove();
            _.remove($scope.users, user);
            $scope.list();
        }
    };

    $scope.update = function () {
        var user = $scope.user;

        if (!user.updated) {
            user.updated = [];
        }
        user.updated.push(new Date().getTime());

        user.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function () {
        $scope.users = User.query();
    };

    $scope.findOne = function() {
        $scope.user = User.get({
            userId: $stateParams.userId
        });
    };

}]);