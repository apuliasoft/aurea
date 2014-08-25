'use strict';

    angular.module('aurea.complexes').controller('ComplexesCtrl', ['$scope', '$stateParams', 'SmartState', '_', 'Provinces', 'Global', 'Complex', function ($scope, $stateParams, SmartState, _, Provinces, Global, Complex) {
    $scope.global = Global;
    $scope.provinces = Provinces.getProvinces();

    $scope.goToListComplexes = function () {
        SmartState.go('all complexes');
    };

    $scope.goToCreateComplex = function () {
        SmartState.go('create complex');
    };

    $scope.goToEditComplex = function (complex) {
        SmartState.go('edit complex', { complexId: complex._id });
    };

    $scope.goToListAcademicYears = function (complex) {
        SmartState.go('all academic years', { complexId: complex._id });
    };

    $scope.init = function () {
        $scope.complex = new Complex({
            school: Global.getSchool()._id
        });
    };

    $scope.create = function(isValid) {
        if (isValid) {
            var complex = $scope.complex;
            complex.$save(function () {
                $scope.goToListComplexes();
            });
        }
    };

    $scope.update = function(isValid) {
        if (isValid) {
            var complex = $scope.complex;
            if (!complex.updated) {
                complex.updated = [];
            }
            complex.updated.push(new Date().getTime());

            complex.$update(function () {
                $scope.goToListComplexes();
            });
        }
    };

    $scope.find = function() {
        $scope.complexes = Complex.query({
            schoolId: Global.getSchool()._id
        });
    };

    $scope.findOne = function() {
        $scope.complex = Complex.get({
            schoolId: Global.getSchool()._id,
            complexId: $stateParams.complexId
        });
    };
}]);

































