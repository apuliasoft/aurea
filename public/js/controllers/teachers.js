'use strict';

angular.module('aurea.teachers').controller('TeachersCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Teacher', function ($scope, $stateParams, $location, _, Global, Teacher) {
    $scope.global = Global;

    $scope.goToListTeachers = function () {
        $location.path('insegnanti');
    };

    $scope.goToCreateTeacher = function () {
        $location.path('insegnanti/nuovo');
    };

    $scope.goToEditTeacher = function (teacher) {
        if (teacher) {
            $location.path('insegnanti/' + teacher._id);
        }
    };

    $scope.goToListAcademicYears = function () {
        $location.path('anni-accademici');
    };

    $scope.goToListStudents = function () {
        $location.path('alunni');
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
