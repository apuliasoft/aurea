'use strict';

angular.module('aurea.schools').controller('SchoolsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Provinces', 'School', function ($scope, $stateParams, $location, _, Global, Provinces, School) {
    $scope.global = Global;

    $scope.provinces = Provinces.getProvinces();

    $scope.columns = [
        {name:'name', label:'Nome'}
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
        $scope.school = new School({complexes:[]});
        $scope.addComplex();
    };

    $scope.addComplex = function () {
        $scope.school.complexes.push({});
    };

    $scope.removeComplex = function (complex) {
        _.remove($scope.school.complexes, complex);
    };

    $scope.create = function() {
        var school = $scope.school;
        school.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(school) {
        if (school) {
            school.$remove();
            _.remove($scope.schools, school);
            $scope.list();
        }
    };

    $scope.update = function() {
        var school = $scope.school;
        if (!school.updated) {
            school.updated = [];
        }
        school.updated.push(new Date().getTime());

        school.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        School.query(function(schools) {
            $scope.schools = schools;
        });
    };

    $scope.findOne = function() {
        School.get({
            schoolId: $stateParams.schoolId
        }, function(school) {
            $scope.school = school;
        });
    };
}]);