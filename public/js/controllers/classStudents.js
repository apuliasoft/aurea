'use strict';

angular.module('aurea.classStudents').controller('ClassStudentsCtrl', ['$scope', '$stateParams', '$filter', 'SmartState', '_', 'Global', 'ClassStudent', function ($scope, $stateParams, $filter, SmartState, _, Global, ClassStudent){

    $scope.global = Global;

    $scope.isItMe = function(student) {
        return student.user._id === Global.getUser()._id;
    };

    $scope.isParentOf = function(student){
        // TODO: da implementare
    };

    $scope.goToStudentStats = function(student){
        SmartState.go('student stats', { studentId: student._id });
    };

    $scope.find = function () {
        ClassStudent.query({
            schoolClassId: Global.getSchoolClass()._id,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id,
            academicYearId: Global.getAcademicYear()._id
        }).$promise
          .then(function (students) {
              Global.title = 'Alunni';
              Global.subtitle = Global.getSchoolClass().name;

              $scope.classStudents = students;
          });
    };

    $scope.findOne = function(){
        ClassStudent.get({
            schoolClassId: Global.getSchoolClass()._id,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id,
            academicYearId: Global.getAcademicYear()._id,
            studentId: $stateParams.studentId
        }).$promise
          .then(function(stats){
              Global.title = 'Statistiche';
              Global.subtitle = $filter('name')(Global.getStudent());

              $scope.stats = stats;
          });
    }
}]);