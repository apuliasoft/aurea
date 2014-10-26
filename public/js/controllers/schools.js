'use strict';

angular.module('aurea.schools')
    .controller('SchoolsCtrl', function ($scope, $stateParams, $mdToast, SmartState, _, Global, School) {
        $scope.global = Global;

        $scope.goToListSchools = function () {
            SmartState.go('all schools');
        };

        $scope.goToCreateSchool = function () {
            SmartState.go('create school');
        };

        $scope.goToEditSchool = function (school) {
            SmartState.go('edit school', { schoolId: school._id });
        };

        $scope.goToListComplexes = function (school) {
            SmartState.go('all complexes', { schoolId: school._id });
        };

        $scope.init = function () {
            $scope.school = new School();
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var school = $scope.school;
                school.$save(function () {
                    $scope.goToListSchools();
                    $mdToast.show({
                      template: '<md-toast>Istituto creato</md-toast>',
                      hideDelay: 2000
                    });
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var school = $scope.school;
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
            }
        };

        $scope.remove = function (school) {
            if (school) {
                school.$remove();
                _.remove($scope.schools, school);
                $scope.goToListSchools();
                $mdToast.show({
                  template: '<md-toast>Istituto cancellato</md-toast>',
                  hideDelay: 2000
                });
            }
        };

        $scope.find = function () {
            School.query().$promise
                .then(function (schools) {
                    $scope.schools = schools;
                });
        };

        $scope.findOne = function () {
            School.get({
                schoolId: $stateParams.schoolId
            }).$promise
                .then(function (school) {
                    $scope.school = school;
                });
        };
    });
