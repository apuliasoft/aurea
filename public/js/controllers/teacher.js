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
        $scope.teachers = Teacher.query();
      };

      $scope.findOne = function () {
        $scope.teacher = Teacher.get({
          teacherId: $routeParams.teacherId
        });
      };

      $scope.init = function () {
        $scope.teacher = new Teacher();
      };

      $scope.create = function () {
        var teacher = $scope.teacher;
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