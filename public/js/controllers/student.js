angular.module('aurea.student')
  .controller('StudentCtrl', ['$scope', '$routeParams', '$location', 'Student',
    function ($scope, $routeParams, $location, Student) {

      $scope.labels = ['Nome', 'Cognome'];
      $scope.columns = ['firstName', 'lastName'];

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
          $location.path('alunni/' + response._id);
        });

        $scope.init();
      };

      $scope.update = function () {
        var student = $scope.student;
        if (!student.updated) {
          student.updated = [];
        }
        student.updated.push(new Date().getTime());

        student.$update(function () {
          $location.path('alunni/' + student._id);
        });
      };

      $scope.view = function (student) {
        if (student) {
          $location.path('alunni/' + student._id);
        }
      };

      $scope.new = function () {
        $location.path('alunni/crea');
      };

      $scope.edit = function (student) {
        if (student) {
          $location.path('alunni/' + student._id + '/modifica');
        }
      };

      $scope.remove = function (student) {
        if (student) {
          student.$remove();

          for (var i in $scope.students) {
            if ($scope.students[i] == student) {
              $scope.students.splice(i, 1);
            }
          }
        }
        else {
          $scope.school.$remove();
          $location.path('alunni');
        }
      };

    }]);