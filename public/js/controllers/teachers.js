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

      $scope.init = function () {
        $scope.teacher = {
          firstName: '',
          lastName: ''
        };
      };

      $scope.create = function () {
        var teacher = new Teachers(this.teacher);
        teacher.$save(function (response) {
          $location.path('insegnanti/' + response._id);
        });

        $scope.init();
      };

    }]);