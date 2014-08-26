'use strict';

angular.module('aurea.teachers').controller('TeachersCtrl', ['$scope', '$stateParams', '$filter', 'SmartState', '_', 'Global', 'Teacher', function ($scope, $stateParams, $filter, SmartState, _, Global, Teacher) {
    $scope.global = Global;

    $scope.goToListTeachers = function () {
        SmartState.go('all teachers');
    };

    $scope.goToCreateTeacher = function () {
        SmartState.go('create teacher');
    };

    $scope.goToEditTeacher = function (teacher) {
        SmartState.go('edit teacher', { teacherId: teacher._id });
    };

    $scope.init = function () {
        Global.title = 'Insegnanti';
        Global.subtitle = 'Nuovo';

        $scope.teacher = new Teacher({
            school: Global.getSchool()._id,
            complex: Global.getComplex()._id
        });
    };

    $scope.create = function (isValid) {
        if (isValid) {
            var teacher = $scope.teacher;
            teacher.$save(function () {
                $scope.goToListTeachers();
            });
        }
    };

    $scope.update = function (isValid) {
        if (isValid) {
            var teacher = $scope.teacher;
            if (!teacher.updated) {
                teacher.updated = [];
            }
            teacher.updated.push(new Date().getTime());

            teacher.$update(function () {
                $scope.goToListTeachers();
            });
        }
    };

    $scope.remove = function (teacher) {
        if (teacher) {
            teacher.$remove();
            _.remove($scope.teachers, teacher);
            $scope.list();
        }
    };

    $scope.find = function () {
        Teacher.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        }).$promise
            .then(function (teachers) {
                Global.title = 'Insegnanti';
                Global.subtitle = Global.getComplex().name;

                $scope.teachers = teachers;
            });
    };

    $scope.findOne = function () {
        Teacher.get({
            teacherId: $stateParams.teacherId,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        }).$promise
            .then(function (teacher) {
                Global.title = 'Insegnanti';
                Global.subtitle = $filter('name')(teacher);

                $scope.teacher = teacher;
            });
    };
}]);
