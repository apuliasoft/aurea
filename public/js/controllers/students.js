angular.module('aurea.students')
  .controller('StudentsController', ['$scope', '$routeParams', '$location', 'Students',
    function ($scope, $routeParams, $location, Students) {

      $scope.find = function () {
        Students.query(function (students) {
          $scope.students = students;
        });
      };

      $scope.findOne = function () {
        Students.get({
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
        var student = new Students(this.student);
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

      $scope.confirmRemove = function (student) {
        if (confirm('Sei sicuro di voler cancellare l\'insegnante?')) {
          $scope.remove(student);
        }
      };

    }]);