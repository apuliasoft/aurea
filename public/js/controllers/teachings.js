'use strict';

angular.module('aurea.teachings').controller('TeachingsCtrl', ['$scope', '$stateParams', 'SmartState', '_', 'Global', 'Teaching', 'Teacher' , function ($scope, $stateParams, SmartState, _, Global, Teaching, Teacher) {
    $scope.global = Global;

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

    $scope.goToListTeaching = function () {
        SmartState.go('all teachings');
    };

    $scope.goToCreateTeaching = function () {
        SmartState.go('create teaching');
    };

    $scope.goToEditTeachng = function (teaching) {
        SmartState.go('edit teaching', { teachingId: teaching._id });
    };

    $scope.init = function () {
        $scope.teaching = new Teaching({
            school: Global.getSchool()._id,
            complex: Global.getComplex()._id,
            academicYear: Global.getAcademicYear()._id,
            schoolClass: Global.getSchoolClass()._id
        });
        $scope.teachers = Teacher.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };

    $scope.create = function(isValid) {
        if(isValid) {
            var teaching = $scope.teaching;
            teaching.$save(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.remove = function(teaching) {
        if (teaching) {
            teaching.$remove();
            _.remove($scope.teachings, teaching);
            $scope.list();
        }
    };

    $scope.update = function(isValid) {
        if(isValid) {
            var teaching = $scope.teaching;
            if (!teaching.updated) {
                teaching.updated = [];
            }
            teaching.updated.push(new Date().getTime());

            teaching.$update(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.find = function() {
        $scope.teachings = Teaching.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id,
            schoolClassId: Global.getSchoolClass()._id
        });
    };

    $scope.findOne = function() {
        $scope.teaching = Teaching.get({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id,
            schoolClassId: Global.getSchoolClass()._id,
            teachingId: $stateParams.teachingId
        });
    };
}]);