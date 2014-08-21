'use strict';

angular.module('aurea.parents').controller('ParentsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'User', 'Parent', function ($scope, $stateParams, $location, _, Global, User, Parent) {

//    $scope.global = Global;
//
//    $scope.columns = [
//        {name:'name', label:'Nome'}
//    ];
//
//    $scope.list = function () {
//        $location.path('scuole');
//    };
//
//    $scope.new = function () {
//        $location.path('scuole/crea');
//    };

    $scope.goToStudent = function (studentId) {
        $location.path('alunni/' + studentId);
    };

//    $scope.edit = function (school) {
//        if (school) {
//            $location.path('scuole/' + school._id + '/modifica');
//        }
//    };

    $scope.init = function () {
        $scope.parent = new Parent({student: $stateParams.studentId});
    };

    $scope.create = function() {
        var parent = $scope.parent;
        parent.$save(function () {
            $scope.goToStudent($stateParams.studentId);
        });
        $scope.init();
    };

//    $scope.remove = function(school) {
//        if (school) {
//            school.$remove();
//            _.remove($scope.schools, school);
//            $scope.list();
//        }
//    };
//
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
//
//    $scope.find = function() {
//        School.query(function(schools) {
//            $scope.schools = schools;
//        });
//    };
//
    $scope.findOne = function() {
        $scope.parent = User.get({
            userId: $stateParams.parentId
        });
    };
}]);

































