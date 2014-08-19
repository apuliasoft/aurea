'use strict';

angular.module('aurea.teachings').controller('TeachingsCtrl', ['$scope', '$stateParams', '$location', '_', 'Global', 'Teaching', 'Teacher', 'SchoolClass' , function ($scope, $stateParams, $location, _, Global, Teaching, Teacher, SchoolClass) {
    $scope.global = Global;

    $scope.columns = [
        {name:'name', label:'Nome'}
    ];

    if(!$scope.schoolClasses) {
        $scope.schoolClasses = SchoolClass.query();
    }

    if(!$scope.teachers) {
        $scope.teachers = Teacher.query();
    }

    $scope.getSchoolClassName = function(schoolClassId) {
        var schoolClass = _.find($scope.schoolClasses, function(schoolClass) {
            return schoolClass._id === schoolClassId;
        });

        return schoolClass && schoolClass.name;
    };

    $scope.getTeacherFullName = function(teacherId) {
        var teacher = _.find($scope.teachers, function(teacher) {
            return teacher._id === teacherId;
        });

        return teacher && $scope.getFullName(teacher);
    };

    $scope.getFullName = function(teacher){
        return teacher.firstName + ' ' + teacher.lastName;
    };

    $scope.list = function () {
        $location.path('insegnamenti');
    };

    $scope.new = function () {
        $location.path('insegnamenti/crea');
    };

    $scope.view = function (teaching) {
        if (teaching) {
            $location.path('insegnamenti/' + teaching._id);
        }
    };

    $scope.edit = function (teaching) {
        if (teaching) {
            $location.path('insegnamenti/' + teaching._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.teaching = new Teaching();
    };

    $scope.create = function() {
        var teaching = $scope.teaching;
        teaching.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.remove = function(teaching) {
        if (teaching) {
            teaching.$remove();
            _.remove($scope.teachings, teaching);
            $scope.list();
        }
    };

    $scope.update = function() {
        var teaching = $scope.teaching;
        if (!teaching.updated) {
            teaching.updated = [];
        }
        teaching.updated.push(new Date().getTime());

        teaching.$update(function (response) {
            $scope.view(response);
        });
    };

    $scope.find = function() {
        $scope.teachings = Teaching.query();
    };

    $scope.findOne = function() {
        $scope.teaching = Teaching.get({
            teachingId: $stateParams.teachingId
        });
    };
}]);