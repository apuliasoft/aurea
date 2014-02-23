angular.module('aurea.teacher')
  .controller('TeacherCtrl', ['$scope', '$routeParams', '$location', 'Teacher',
    function ($scope, $routeParams, $location, Teacher) {

      $scope.labels = ['Nome', 'Cognome'];
      $scope.columns = ['firstName', 'lastName'];

      $scope.list = function () {
        $location.path('insegnanti');
      };

      $scope.new = function () {
        $location.path('insegnanti/crea');
      };

      $scope.view = function (teacher) {
        if (teacher) {
          $location.path('insegnanti/' + teacher._id);
        }
      };

      $scope.edit = function (teacher) {
        if (teacher) {
          $location.path('insegnanti/' + teacher._id + '/modifica');
        }
      };

      $scope.find = function () {
        Teacher.query(function (teachers) {
          $scope.teachers = teachers;
        });
      };

      $scope.findOne = function () {
        Teacher.get({
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
        var teacher = new Teacher(this.teacher);
        teacher.$save(function (response) {
          $scope.view(response);
        });

        $scope.init();
      };

      $scope.update = function () {
        var teacher = $scope.teacher;
        if (!teacher.updated) {
          teacher.updated = [];
        }
        teacher.updated.push(new Date().getTime());

        teacher.$update(function (response) {
          $scope.view(response);
        });
      };

      $scope.remove = function (teacher) {
        if (teacher) {
          teacher.$remove();
          _.remove($scope.teachers, teacher);
          $scope.list();
        }
      };

    }]);