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

      $scope.update = function () {
        var teacher = $scope.teacher;
        if (!teacher.updated) {
          teacher.updated = [];
        }
        teacher.updated.push(new Date().getTime());

        teacher.$update(function () {
          $location.path('insegnanti/' + teacher._id);
        });
      };

      $scope.remove = function (teacher) {
        if (teacher) {
          teacher.$remove();

          for (var i in $scope.teachers) {
            if ($scope.teachers[i] == teacher) {
              $scope.teachers.splice(i, 1);
            }
          }
        }
        else {
          $scope.school.$remove();
          $location.path('insegnanti');
        }
      };

      $scope.confirmRemove = function (teacher) {
        if (confirm('Sei sicuro di voler cancellare l\'insegnante?')) {
          $scope.remove(teacher);
        }
      };

    }]);