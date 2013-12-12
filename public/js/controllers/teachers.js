angular.module('aurea.teachers')
  .controller('TeachersController', ['$scope', '$routeParams', '$location', 'Teachers',
    function ($scope, $routeParams, $location, Teachers) {

      $scope.find = function () {
        Teachers.query(function (teachers) {
          $scope.teachers = teachers;
        });
      };

      $scope.findOne = function () {
        Teachers.get({
          teacherId: $routeParams.teacherId
        }, function (teacher) {
          $scope.teacher = teacher;
        });
      };

    }]);