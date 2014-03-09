'use strict';

angular.module('aurea.system').controller('IndexCtrl', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);