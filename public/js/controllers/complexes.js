'use strict';

angular.module('aurea.complexes').controller('ComplexesCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Provinces', 'Complex', function ($scope, $stateParams, $location, _, Global, Provinces, Complex) {

    $scope.provinces = Provinces.getProvinces();

//    $scope.global = Global;
//
//    $scope.columns = [
//        {name:'name', label:'Nome'}
//    ];
//
//    $scope.list = function () {
//        $location.path('scuole');
//    };
//
//    $scope.new = function () {
//        $location.path('scuole/crea');
//    };

    $scope.goToSchool = function (schoolId) {
        $location.path('scuole/' + schoolId);
    };

//    $scope.edit = function (school) {
//        if (school) {
//            $location.path('scuole/' + school._id + '/modifica');
//        }
//    };

    $scope.init = function () {
        $scope.complex = new Complex({school: $stateParams.schoolId});
    };

    $scope.create = function() {
        var complex = $scope.complex;
        complex.$save(function (response) {
            $scope.goToSchool(response.school);
        });
        $scope.init();
    };

//    $scope.remove = function(school) {
//        if (school) {
//            school.$remove();
//            _.remove($scope.schools, school);
//            $scope.list();
//        }
//    };
//
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
//
//    $scope.find = function() {
//        School.query(function(schools) {
//            $scope.schools = schools;
//        });
//    };
//
    $scope.findOne = function() {
        $scope.complex = Complex.get({
            schoolId: $stateParams.schoolId,
            complexId: $stateParams.complexId
        });
    };
}]);

































