'use strict';

angular.module('aurea.students').controller('StudentsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'Student', 'Parent', function ($scope, $stateParams, $location, $filter, _, Global, Student, Parent) {
    $scope.global = Global;

    $scope.columns = [
        {name:'firstName', label:'Nome'},
        {name:'lastName', label:'Cognome'},
        {name:'birthDate', label:'Data di nascita', filter:'date'}
    ];

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
        $scope.student = new Student({complex: Global.getComplex()._id});
    };

    $scope.create = function(isValid) {
        if(isValid) {
            var student = $scope.student;
            student.$save(function (response) {
                $scope.view(response);
            });
            $scope.init();
        }
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove();
            _.remove($scope.students, student);
            $scope.list();
        }
    };

    $scope.update = function(isValid) {
        if(isValid) {
            var student = $scope.student;
            if (!student.updated) {
                student.updated = [];
            }
            student.updated.push(new Date().getTime());

            student.$update(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.find = function() {
        $scope.students = Student.query({complexId: Global.getComplex()._id});
    };

    $scope.findOne = function() {
        $scope.student = Student.get({
            studentId: $stateParams.studentId,
            complexId: Global.getComplex()._id
        },
        function(student){
            student.birthDate = $filter('date')(student.birthDate, 'yyyy-MM-dd');
        });
    };

    $scope.findParents = function () {
        $scope.parents = Parent.query({studentId: $stateParams.studentId});
    };

    $scope.goToCreateParent = function(studentId) {
        $location.path('alunni/' + studentId + '/genitori/crea');
    };

    $scope.goToEditParent = function(studentId, parentId) {
        $location.path('alunni/' + studentId + '/genitori/' + parentId + '/modifica');
    };
}]);