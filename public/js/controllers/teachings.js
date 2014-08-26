'use strict';

angular.module('aurea.teachings').controller('TeachingsCtrl', ['$scope', '$stateParams', 'SmartState', '_', 'Global', 'Teaching', 'Teacher' , function ($scope, $stateParams, SmartState, _, Global, Teaching, Teacher) {
    $scope.global = Global;

    $scope.goToListTeachings = function () {
        SmartState.go('all teachings');
    };

    $scope.goToCreateTeaching = function () {
        SmartState.go('create teaching');
    };

    $scope.goToEditTeaching = function (teaching) {
        SmartState.go('edit teaching', { teachingId: teaching._id });
    };

    $scope.init = function () {
        $scope.teaching = new Teaching({
            school: Global.getSchool()._id,
            complex: Global.getComplex()._id,
            academicYear: Global.getAcademicYear()._id,
            schoolClass: Global.getSchoolClass()._id
        });
        Teacher.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        }).$promise
            .then(function (teachers) {
                Global.title = 'Insegnamenti';
                Global.subtitle = 'Nuovo';

                $scope.teachers = teachers;
            });
    };

    $scope.create = function (isValid) {
        if (isValid) {
            var teaching = $scope.teaching;
            teaching.$save(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.update = function (isValid) {
        if (isValid) {
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

    $scope.remove = function (teaching) {
        if (teaching) {
            teaching.$remove();
            _.remove($scope.teachings, teaching);
            $scope.list();
        }
    };

    $scope.find = function () {
        Teaching.query({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id,
            schoolClassId: Global.getSchoolClass()._id
        }).$promise
            .then(function (teachings) {
                Global.title = 'Insegnamenti';
                Global.subtitle = Global.getSchoolClass().name;

                $scope.teachings = teachings;
            });
    };

    $scope.findOne = function () {
        Teaching.get({
            schoolId: Global.getSchool()._id,
            complexId: Global.getComplex()._id,
            academicYearId: Global.getAcademicYear()._id,
            schoolClassId: Global.getSchoolClass()._id,
            teachingId: $stateParams.teachingId
        }).$promise
            .then(function (teaching) {
                Global.title = 'Insegnamenti';
                Global.subtitle = teaching.name;

                $scope.teaching = teaching;
            });
    };
}]);