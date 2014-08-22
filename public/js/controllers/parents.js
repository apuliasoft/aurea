'use strict';

angular.module('aurea.parents').controller('ParentsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'User', 'Parent', function ($scope, $stateParams, $location, _, Global, User, Parent) {

    $scope.goToStudent = function (studentId) {
        $location.path('alunni/' + studentId);
    };

    $scope.init = function () {
        $scope.parent = new Parent({student: $stateParams.studentId});
    };

    $scope.create = function() {
        var parent = $scope.parent;
        parent.$save(function () {
            $scope.goToStudent($stateParams.studentId);
        });
    };

    $scope.update = function() {
        var parent = $scope.parent;
        if (!parent.updated) {
            parent.updated = [];
        }
        parent.updated.push(new Date().getTime());

        parent.$update(function () {
            $scope.goToStudent($stateParams.studentId);
        });
    };

    $scope.findOne = function() {
        $scope.parent = User.get({
            userId: $stateParams.parentId
        });
    };
}]);

































