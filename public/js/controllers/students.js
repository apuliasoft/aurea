'use strict';

angular.module('aurea.students')
    .controller('StudentsCtrl', function ($scope, $stateParams, SmartState, $filter, _, Global, Student) {
        $scope.global = Global;

        $scope.goToListStudents = function () {
            SmartState.go('all students');
        };

        $scope.goToCreateStudent = function () {
            SmartState.go('create student');
        };

        $scope.goToEditStudent = function (student) {
            SmartState.go('edit student', { studentId: student._id });
        };

        $scope.goToListParents = function (student) {
            SmartState.go('all parents', { studentId: student._id });
        };

        $scope.isItMe = function (student) {
            return student.user._id === Global.getUser()._id;
        };

        $scope.init = function () {
            $scope.student = new Student({
                complex: Global.getComplex()._id,
                school: Global.getSchool()._id
            });
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var student = $scope.student;
                student.$save(function () {
                    $scope.goToListStudents();
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var student = $scope.student;
                if (!student.updated) {
                    student.updated = [];
                }
                student.updated.push(new Date().getTime());

                student.$update(function () {
                    $scope.goToListStudents();
                });
            }
        };

        $scope.remove = function (student) {
            if (student) {
                student.$remove();
                _.remove($scope.students, student);
                $scope.goToListStudents();
            }
        };

        $scope.find = function () {
            Student.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (students) {
                    $scope.students = students;
                });
        };

        $scope.findOne = function () {
            Student.get({
                studentId: $stateParams.studentId,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (student) {
                    student.birthDate = new Date(student.birthDate);
                    $scope.student = student;
                });
        };
    });
