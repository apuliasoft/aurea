'use strict';

angular.module('aurea.complexes').controller('ComplexesCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Provinces', 'Complex', function ($scope, $stateParams, $location, _, Global, Provinces, Complex) {

    $scope.provinces = Provinces.getProvinces();

    $scope.goToSchool = function (schoolId) {
        $location.path('scuole/' + schoolId);
    };

    $scope.init = function () {
        $scope.complex = new Complex({school: $stateParams.schoolId});
    };

    $scope.create = function() {
        var complex = $scope.complex;
        complex.$save(function (response) {
            $scope.goToSchool(response.school);
        });
    };

    $scope.update = function() {
        var complex = $scope.complex;
        if (!complex.updated) {
            complex.updated = [];
        }
        complex.updated.push(new Date().getTime());

        complex.$update(function (response) {
            $scope.goToSchool(response.school);
        });
    };

    $scope.findOne = function() {
        $scope.complex = Complex.get({
            schoolId: $stateParams.schoolId,
            complexId: $stateParams.complexId
        });
    };
}]);

































