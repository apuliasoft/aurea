'use strict';

angular.module('aurea.schools').controller('SchoolsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Complex', 'School', function ($scope, $stateParams, $location, _, Global, Complex, School) {
    $scope.global = Global;

    $scope.columns = [
        {name: 'name', label: 'Nome'}
    ];

    $scope.list = function () {
        $location.path('scuole');
    };

    $scope.new = function () {
        $location.path('scuole/crea');
    };

    $scope.view = function (school) {
        if (school) {
            $location.path('scuole/' + school._id);
        }
    };

    $scope.edit = function (school) {
        if (school) {
            $location.path('scuole/' + school._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.school = new School();
    };

    $scope.create = function () {
        var school = $scope.school;
        school.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function (school) {
        if (school) {
            school.$remove();
            _.remove($scope.schools, school);
            $scope.list();
        }
    };

    $scope.update = function () {
        var school = $scope.school;
        if (!school.updated) {
            school.updated = [];
        }
        school.updated.push(new Date().getTime());

        school.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function () {
        School.query(function (schools) {
            $scope.schools = schools;
        });
    };

    $scope.findOne = function () {
        $scope.school = School.get({schoolId: $stateParams.schoolId});
    };

    $scope.findComplexes = function () {
        $scope.complexes = Complex.query({schoolId: $stateParams.schoolId});
    };

    $scope.goToCreateComplex = function (schoolId) {
        $location.path('scuole/' + schoolId + '/plessi/crea');
    };

    $scope.goToEditComplex = function (schoolId,complexId) {
        $location.path('scuole/' + schoolId + '/plessi/' + complexId + '/modifica');
    };
}]);

































