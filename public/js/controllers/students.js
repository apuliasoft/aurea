'use strict';

angular.module('aurea.students').controller('StudentsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'Student', 'Complex', function ($scope, $stateParams, $location, $filter, _, Global, Student, Complex) {
    $scope.global = Global;

    $scope.columns = [
        {name:'firstName', label:'Nome'},
        {name:'lastName', label:'Cognome'},
        {name:'birthDate', label:'Data di nascita', filter:'date'}
    ];

    if(!$scope.complexes) {
        $scope.complexes = Complex.query();
    }

    $scope.getComplexName = function(complexId) {
        var complex = _.find($scope.complexes, function(complex) {
            return complex._id === complexId;
        });

        return complex && complex.name;
    };

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

    $scope.init = function () {
        $scope.student = new Student();
    };

    $scope.create = function() {
        var student = $scope.student;
        student.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove();
            _.remove($scope.students, student);
            $scope.list();
        }
    };

    $scope.update = function() {
        var student = $scope.student;
        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());

        student.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.students = Student.query();
    };

    $scope.findOne = function() {
        $scope.student = Student.get({
            studentId: $stateParams.studentId
        },
        function(student){
            student.birthDate = $filter('date')(student.birthDate, 'yyyy-MM-dd');
        });
    };
}]);