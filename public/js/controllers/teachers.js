'use strict';

angular.module('aurea.teachers')
    .controller('TeachersCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, Teacher) {
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

        $scope.isItMe = function (teacher) {
            return teacher.user._id === Global.getUser()._id;
        };

        $scope.find = function () {
            Teacher.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (teachers) {
                    $scope.teachers = teachers;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica insegnante';
                findOne();
            } else {
                $scope.title = 'Nuovo insegnante';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var teacher = $scope.teacher;
                if ($state.current.data.editMode) {
                    update(teacher);
                } else {
                    create(teacher);
                }
            }
        };

        $scope.remove = function (teacher) {
            if (teacher) {
                teacher.$remove(function() {
                    _.remove($scope.teachers, teacher);
                    $mdToast.show({
                        template: '<md-toast>Insegnante cancellato</md-toast>',
                        hideDelay: 2000
                    });
                });
            }
        };

        var prepare = function () {
            $scope.teacher = new Teacher({
                school: Global.getSchool()._id,
                complex: Global.getComplex()._id
            });
        };

        var findOne = function () {
            Teacher.get({
                teacherId: $stateParams.teacherId,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (teacher) {
                    $scope.teacher = teacher;
                });
        };

        var create = function (teacher) {
            teacher.$save(function () {
                $scope.goToListTeachers();
                $mdToast.show({
                    template: '<md-toast>Insegnante creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (teacher) {
            if (!teacher.updated) {
                teacher.updated = [];
            }
            teacher.updated.push(new Date().getTime());

            teacher.$update(function () {
                $scope.goToListTeachers();
                $mdToast.show({
                    template: '<md-toast>Insegnante aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };
    });
