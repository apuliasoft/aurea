'use strict';

angular.module('aurea.teachers').controller('TeachersCtrl', ['$scope', '$stateParams', 'SmartState', '_', 'Global', 'Teacher', function ($scope, $stateParams, SmartState, _, Global, Teacher) {
    $scope.global = Global;

    $scope.goToListTeachers = function () {
        SmartState.go('all teachers');
    };

    $scope.goToCreateTeacher = function () {
        SmartState.go('create teacher');
    };

    $scope.goToEditTeacher = function (teacher) {
        SmartState.go('edit teachers', { teacherId: teacher._id });
    };

    $scope.goToListAcademicYears = function () {
        SmartState.go('all academic years');
    };

    $scope.goToListStudents = function () {
        SmartState.go('all students');
    };

    $scope.init = function () {
        $scope.teacher = new Teacher({
          school: Global.getSchool()._id,
          complex: Global.getComplex()._id
        });
    };

    $scope.create = function(isValid) {
        if (isValid) {
            var teacher = $scope.teacher;
            teacher.$save(function () {
                $scope.goToListTeachers();
            });
        }
    };

    $scope.update = function(isValid) {
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

    $scope.remove = function(teacher) {
        if (teacher) {
            teacher.$remove();
            _.remove($scope.teachers, teacher);
            $scope.list();
        }
    };

    $scope.find = function() {
        $scope.teachers = Teacher.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };

    $scope.findOne = function() {
        $scope.teacher = Teacher.get({
            teacherId: $stateParams.teacherId,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };
}]);
