angular.module('aurea.students')
  .controller('StudentsController', ['$scope', '$routeParams', '$location', 'Students',
    function ($scope, $routeParams, $location, Students) {

      $scope.find = function () {
        Students.query(function (students) {
          $scope.students = students;
        });
      };

    }]);