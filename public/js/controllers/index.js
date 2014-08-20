'use strict';

angular.module('aurea.system').controller('IndexCtrl', ['$scope', 'AcademicYear', 'Global', function ($scope, AcademicYear, Global) {
    $scope.global = Global;

    if (!$scope.academicYears) {
        $scope.academicYears = AcademicYear.query();
    }

    $scope.setAcademicYear = function(academicYear) {
      Global.academicYear = academicYear;
    };
}]);