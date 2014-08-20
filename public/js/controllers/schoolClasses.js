'use strict';

angular.module('aurea.schoolClasses').controller('SchoolClassesCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'SchoolClass', 'AcademicYear', 'Student', function ($scope, $stateParams, $location, $filter, _, Global, SchoolClass, AcademicYear, Student) {
    $scope.global = Global;

    $scope.columns = [
        {name:'name', label:'Nome'}
    ];

    if(!$scope.academicYears) {
        $scope.academicYears = AcademicYear.query();
    }

    $scope.addStudent = function(student) {
        $scope.chosenStudents.push(student);
        $scope.chosableStudents = _.without($scope.chosableStudents, student);
    };

    $scope.removeStudent = function(student) {
        $scope.chosableStudents.push(student);
        $scope.chosenStudents = _.without($scope.chosenStudents, student);
    };

    $scope.getAcademicYearName = function(academicYearId) {
        var academicYear = _.find($scope.academicYears, function(academicYear) {
            return academicYear._id === academicYearId;
        });

        return academicYear && academicYear.name;
    };

    $scope.getStudentFullName = function(studentId) {
        var student = _.find($scope.students, function(student) {
            return student._id === studentId;
        });

        return student && $filter('name')(student);
    };

    $scope.list = function () {
        $location.path('classi');
    };

    $scope.new = function () {
        $location.path('classi/crea');
    };

    $scope.view = function (schoolClass) {
        if (schoolClass) {
            $location.path('classi/' + schoolClass._id);
        }
    };

    $scope.edit = function (schoolClass) {
        if (schoolClass) {
            $location.path('classi/' + schoolClass._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.schoolClass = new SchoolClass();

        $scope.chosableStudents = Student.query();
        $scope.chosenStudents = [];
    };

    $scope.create = function() {
        var schoolClass = $scope.schoolClass;
        schoolClass.students = _.map($scope.chosenStudents, function(student){
            return student._id;
        });

        console.log(schoolClass);

        schoolClass.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(schoolClass) {
        if (schoolClass) {
            schoolClass.$remove();
            _.remove($scope.schoolClasses, schoolClass);
            $scope.list();
        }
    };

    $scope.update = function() {
        var schoolClass = $scope.schoolClass;
        if (!schoolClass.updated) {
            schoolClass.updated = [];
        }
        schoolClass.updated.push(new Date().getTime());
        schoolClass.students = _.map($scope.chosenStudents, function(student){
            return student._id;
        });

        schoolClass.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.schoolClasses = SchoolClass.query();
    };

    $scope.findOne = function() {
        $scope.schoolClass = SchoolClass.get({
            schoolClassId: $stateParams.schoolClassId
        });

        $scope.schoolClass.$promise.then(function(){
            $scope.chosableStudents = Student.query();

            $scope.chosableStudents.$promise.then(function(){

                $scope.chosenStudents = _.filter($scope.chosableStudents, function(student) {
                    return _.contains($scope.schoolClass.students, student._id);
                });

                $scope.chosableStudents = _.difference($scope.chosableStudents, $scope.chosenStudents);
            });
        });
    };
}]);


























