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
        Student.query(function (students) {
          $scope.students = students;
        });
      };

      $scope.findOne = function () {
        Student.get({
          studentId: $routeParams.studentId
        }, function (student) {
          $scope.student = student;
        });
      };

      $scope.init = function () {
        $scope.student = {
          firstName: '',
          lastName: '',
          birthDate: ''
        };
      };

      $scope.create = function () {
        var student = new Student(this.student);
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