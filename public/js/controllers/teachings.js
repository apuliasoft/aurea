'use strict';

angular.module('aurea.teachings')
    .controller('TeachingsCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, Teaching, Teacher) {
        $scope.global = Global;

        $scope.goToListTeachings = function () {
            SmartState.go('all teachings');
        };

        $scope.goToCreateTeaching = function () {
            SmartState.go('create teaching');
        };

        $scope.goToEditTeaching = function (teaching) {
            SmartState.go('edit teaching', {teachingId: teaching._id});
        };

        $scope.goToTeachingRegistry = function (teaching) {
            SmartState.go('teaching registry by date', {
                teachingId: teaching._id
            });
        };

        $scope.find = function () {
            Teaching.query({
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id,
                academicYearId: Global.getAcademicYear()._id,
                schoolClassId: Global.getSchoolClass()._id
            }).$promise
                .then(function (teachings) {
                    $scope.teachings = teachings;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica insegnamento';
                findOne();
            } else {
                $scope.title = 'Nuovo insegnamento';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var teaching = $scope.teaching;
                if ($state.current.data.editMode) {
                    update(teaching);
                } else {
                    create(teaching);
                }
            }
        };

        $scope.remove = function (teaching) {
            if (teaching) {
                teaching.$remove();
                _.remove($scope.teachings, teaching);
                $mdToast.show({
                    template: '<md-toast>Insegnamento cancellato</md-toast>',
                    hideDelay: 2000
                });
            }
        };

        var prepare = function () {
            $scope.teaching = new Teaching({
                school: Global.getSchool()._id,
                complex: Global.getComplex()._id,
                academicYear: Global.getAcademicYear()._id,
                schoolClass: Global.getSchoolClass()._id
            });

            Teacher.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (teachers) {
                    $scope.teachers = teachers;
                });
        };

        var findOne = function () {
            Teaching.get({
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id,
                academicYearId: Global.getAcademicYear()._id,
                schoolClassId: Global.getSchoolClass()._id,
                teachingId: $stateParams.teachingId
            }).$promise
                .then(function (teaching) {
                    $scope.teaching = teaching;
                });
        };

        var create = function (teaching) {
            teaching.$save(function () {
                $scope.goToListTeachings();
                $mdToast.show({
                    template: '<md-toast>Insegnamento creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (teaching) {
            if (!teaching.updated) {
                teaching.updated = [];
            }
            teaching.updated.push(new Date().getTime());

            teaching.$update(function () {
                $scope.goToListTeachings();
                $mdToast.show({
                    template: '<md-toast>Insegnamento aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };
    });