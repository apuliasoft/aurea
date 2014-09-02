'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', '$localStorage', 'SmartState', '$stateParams', function ($scope, Global, $filter, $localStorage, SmartState, $stateParams) {
    $scope.global = Global;

    $scope.goToSchool = function (school) {
        SmartState.go('all complexes', {
            schoolId: school._id
        });
    };

    $scope.goToComplex = function (complex) {
        SmartState.go('all academic years', {
            schoolId: $stateParams.schoolId,
            complexId: complex._id
        });
    };

    $scope.goToAcademicYear = function (academicYear) {
        SmartState.go('all school classes', {
            schoolId: $stateParams.schoolId,
            complexId: $stateParams.complexId,
            academicYearId: academicYear._id
        });
    };

}]);
