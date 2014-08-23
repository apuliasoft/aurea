'use strict';

angular.module('aurea.system').controller('IndexCtrl', ['$scope', 'AcademicYear', 'Global', function ($scope, AcademicYear, Global) {
    $scope.global = Global;

    Global.title = "Aurea: un registro elettronico aperto";
}]);