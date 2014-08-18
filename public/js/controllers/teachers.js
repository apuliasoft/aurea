'use strict';

angular.module('aurea.teachers').controller('TeachersCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Teacher', 'Complex', function ($scope, $stateParams, $location, _, Global, Teacher, Complex) {
    $scope.global = Global;

    $scope.columns = [
        {name:'firstName', label:'Nome'},
        {name:'lastName', label:'Cognome'}
    ];

    $scope.list = function () {
        $location.path('insegnanti');
    };

    $scope.new = function () {
        $location.path('insegnanti/crea');
    };

    $scope.view = function (teacher) {
        if (teacher) {
            $location.path('insegnanti/' + teacher._id);
        }
    };

    $scope.edit = function (teacher) {
        if (teacher) {
            $location.path('insegnanti/' + teacher._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.teacher = new Teacher();
    };

    $scope.create = function() {
        var teacher = $scope.teacher;
        teacher.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(teacher) {
        if (teacher) {
            teacher.$remove();
            _.remove($scope.teachers, teacher);
            $scope.list();
        }
    };

    $scope.update = function() {
        var teacher = $scope.teacher;
        if (!teacher.updated) {
            teacher.updated = [];
        }
        teacher.updated.push(new Date().getTime());

        teacher.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.teachers = Teacher.query();
    };

    $scope.findOne = function() {
        $scope.teacher = Teacher.get({
            teacherId: $stateParams.teacherId
        });
    };
}]);