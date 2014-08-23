'use strict';

angular.module('aurea.students').controller('StudentsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'Student', function ($scope, $stateParams, $location, $filter, _, Global, Student) {
    $scope.global = Global;

    $scope.goToListStudents = function () {
        $location.path('alunni');
    };

    $scope.goToCreateStudent = function () {
        $location.path('alunni/nuovo');
    };

    $scope.goToEditStudent = function (student) {
        if (student) {
            $location.path('alunni/' + student._id);
        }
    };

    $scope.goToListAcademicYears = function () {
        $location.path('anni-accademici');
    };

    $scope.goToListTeachers = function () {
        $location.path('insegnanti');
    };

    $scope.goToListParents = function (student) {
      if(student) {
        Global.setStudent(student);
        $location.path('genitori');
      }
    };

    $scope.init = function () {
        $scope.student = new Student({
            complex: Global.getComplex()._id,
            school: Global.getSchool()._id
        });
    };

    $scope.create = function(isValid) {
        if(isValid) {
            var student = $scope.student;
            student.$save(function () {
                $scope.goToListStudents();
            });
        }
    };

    $scope.update = function(isValid) {
        if(isValid) {
            var student = $scope.student;
            if (!student.updated) {
                student.updated = [];
            }
            student.updated.push(new Date().getTime());

            student.$update(function () {
                $scope.goToListStudents();
            });
        }
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove();
            _.remove($scope.students, student);
            $scope.goToListStudents();
        }
    };

    $scope.find = function() {
        $scope.students = Student.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };

    $scope.findOne = function() {
        $scope.student = Student.get({
            studentId: $stateParams.studentId,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        },
        function(student){
            student.birthDate = $filter('date')(student.birthDate, 'yyyy-MM-dd');
        });
    };
}]);
