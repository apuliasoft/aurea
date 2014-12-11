'use strict';

angular.module('aurea.schools')
    .controller('SchoolsCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, School) {
        $scope.global = Global;

        $scope.goToListSchools = function () {
            SmartState.go('all schools');
        };

        $scope.goToCreateSchool = function () {
            SmartState.go('create school');
        };

        $scope.goToEditSchool = function (school) {
            SmartState.go('edit school', {schoolId: school._id});
        };

        $scope.goToListComplexes = function (school) {
            SmartState.go('all complexes', {schoolId: school._id});
        };

        $scope.find = function () {
            School.query().$promise
                .then(function (schools) {
                    $scope.schools = schools;
                });
        };

        $scope.init = function () {
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica istituto';
                findOne();
            } else {
                $scope.title = 'Nuovo istituto';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var school = $scope.school;
                if ($state.current.data.editMode) {
                    update(school);
                } else {
                    create(school);
                }
            }
        };

        $scope.remove = function (school) {
            if (school) {
                school.$remove(function () {
                    _.remove($scope.schools, school);
                    $mdToast.show({
                        template: '<md-toast>Istituto cancellato</md-toast>',
                        hideDelay: 2000
                    });
                });
            }
        };

        var prepare = function () {
            $scope.school = new School();
        };

        var findOne = function () {
            School.get({
                schoolId: $stateParams.schoolId
            }).$promise
                .then(function (school) {
                    $scope.school = school;
                });
        };

        var create = function (school) {
            school.$save(function () {
                $scope.goToListSchools();
                $mdToast.show({
                    template: '<md-toast>Istituto creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (school) {
            if (!school.updated) {
                school.updated = [];
            }
            school.updated.push(new Date().getTime());

            school.$update(function () {
                $scope.goToListSchools();
                $mdToast.show({
                    template: '<md-toast>Istituto aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };
    });
