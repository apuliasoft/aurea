angular.module('aurea.student')
  .controller('StudentCtrl', ['$scope', '$routeParams', '$location', 'Student',
    function ($scope, $routeParams, $location, Student) {

      $scope.labels = ['Nome', 'Cognome'];
      $scope.columns = ['firstName', 'lastName'];

      $scope.list = function () {
        $location.path('alunni');
      };

      $scope.new = function () {
        $location.path('alunni/crea');
      };

      $scope.view = function (student) {
        if (student) {
          $location.path('alunni/' + student._id);
        }
      };

      $scope.edit = function (student) {
        if (student) {
          $location.path('alunni/' + student._id + '/modifica');
        }
      };

      $scope.find = function () {
        $scope.students = Student.query();
      };

      $scope.findOne = function () {
        $scope.student = Student.get({
          studentId: $routeParams.studentId
        });
      };

      $scope.init = function () {
        $scope.student = new Student();
      };

      $scope.create = function () {
        var student = $scope.student;
        student.$save(function (response) {
          $scope.view(response);
        });
        $scope.init();
      };

      $scope.update = function () {
        var student = $scope.student;
        if (!student.updated) {
          student.updated = [];
        }
        student.updated.push(new Date().getTime());

        student.$update(function (response) {
          $scope.view(response);
        });
      };

      $scope.remove = function (student) {
        if (student) {
          student.$remove();
          _.remove($scope.students, student);
          $scope.list();
        }
      };

    }]);