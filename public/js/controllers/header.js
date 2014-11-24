'use strict';

angular.module('aurea.system')
    .controller('HeaderCtrl', function ($scope, Global, $filter, SmartState, $stateParams) {
        $scope.global = Global;

        $scope.getFeedback = function() {
            SmartState.go('feedback');
        };

        $scope.login = function() {
            SmartState.go('login user');
        };

        $scope.logout = function() {
            SmartState.go('logout user');
        };

        $scope.goToListCommunications = function () {
            SmartState.go('all communications');
        };

        $scope.goToViewUser = function () {
            SmartState.go('user by id', { userId: Global.user._id });
        };

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
