angular.module('aurea.schools')
  .controller('SchoolsController', ['$scope', 'Schools',
    function ($scope, Schools) {

      $scope.find = function () {
        Schools.query(function (schools) {
          $scope.schools = schools;
        });
      };

    }]);