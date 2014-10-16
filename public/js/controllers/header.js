'use strict';

angular.module('aurea.system')
    .controller('HeaderCtrl', function ($scope, Global, $filter, SmartState, $stateParams) {
        $scope.global = Global;

        $scope.goToAcademicYear = function (academicYear) {
            SmartState.go('all school classes', {
                schoolId: $stateParams.schoolId,
                complexId: $stateParams.complexId,
                academicYearId: academicYear._id
            });
        };

        $scope.goToComplex = function (complex) {
            SmartState.go('all academic years', {
                schoolId: $stateParams.schoolId,
                complexId: complex._id
            });
        };

        $scope.goToSchool = function (school) {
            SmartState.go('all complexes', {
                schoolId: school._id
            });
        };

        $scope.goToStudent = function (student) {
            SmartState.go('all parents', {
                schoolId: $stateParams.schoolId,
                complexId: $stateParams.complexId,
                studentId: student._id
            });
        };

        $scope.goToSchoolClass = function (schoolClass) {
            SmartState.go('class registry by date', {
                schoolClassId: schoolClass._id,
                date: $filter('date')(new Date(), 'yyyy-MM-dd')
            });
        };

        $scope.goToTeaching = function (teaching) {
            SmartState.go('teaching registry by date', {
                teachingId: teaching._id,
                date: $filter('date')(new Date(), 'yyyy-MM-dd')
            });
        };
    });
