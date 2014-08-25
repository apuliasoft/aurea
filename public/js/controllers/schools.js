'use strict';

angular.module('aurea.schools').controller('SchoolsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'School', function ($scope, $stateParams, $location, _, Global, School) {
    $scope.global = Global;

    $scope.goToListSchools = function () {
        $location.path('scuole');
    };

    $scope.goToCreateSchool = function () {
        $location.path('scuole/nuova');
    };

    $scope.goToEditSchool = function (school) {
        if (school) {
            $location.path('scuole/' + school._id);
        }
    };

    $scope.goToListComplexes = function (school) {
        if (school) {
            Global.setSchool(school);
            $location.path('plessi');
        }
    };

    $scope.init = function () {
        $scope.school = new School();
        Global.title = 'Scuole';
        Global.subtitle = 'Nuova';
    };

    $scope.create = function (isValid) {
        if (isValid) {
            var school = $scope.school;
            school.$save(function () {
                $scope.goToListSchools();
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
            });
        }
    };

    $scope.remove = function (school) {
        if (school) {
            school.$remove();
            _.remove($scope.schools, school);
            $scope.goToListSchools();
        }
    };

    $scope.find = function () {
        School.query().$promise
            .then(function (schools) {
                $scope.schools = schools;

                Global.title = 'Scuole';
            });
    };

    $scope.findOne = function () {
        School.get({
            schoolId: $stateParams.schoolId
        }).$promise
            .then(function (school) {
                $scope.school = school;

                Global.title = 'Scuole';
                Global.subtitle = school.name;
            });
    };

}]);

































