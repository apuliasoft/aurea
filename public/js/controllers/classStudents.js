'use strict';

angular.module('aurea.classStudents')
    .controller('ClassStudentsCtrl', function ($scope, $stateParams, SmartState, _, Global, ClassStudent) {
        $scope.global = Global;

        $scope.isItMe = function (student) {
            return student.user._id === Global.getUser()._id;
        };

        $scope.isParentOf = function (student) {
            if (Global.getUser().parent) {
                return student._id === Global.getUser().parent.student;
            }
            return false;
        };

        $scope.goToStudentStats = function (student) {
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
                    $scope.classStudents = students;
                });
        };

        $scope.findOne = function () {
            ClassStudent.get({
                schoolClassId: Global.getSchoolClass()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id,
                academicYearId: Global.getAcademicYear()._id,
                studentId: $stateParams.studentId
            }).$promise
                .then(function (stats) {
                    $scope.stats = formatStats(stats);

                    $scope.totalAbsences = _.reduce($scope.stats, function (sum, num) {
                        return sum + num.value;
                    }, 0);
                });
        };

        var formatStats = function (stats) {

            var academicYear = Global.getAcademicYear();

            var result = [];

            var currentDate = new Date(academicYear.startDate);
            var endDate = new Date(academicYear.endDate);
            endDate = getMonthYear(new Date(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()));

            while (getMonthYear(currentDate) !== endDate) {
                result.push({
                    name: getMonthYear(currentDate)
                });
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
            }

            var groupedAbsences = _.groupBy(stats.absences, function (a) {
                var date = new Date(a);
                return getMonthYear(date);
            });


            result = _.map(result, function (elem) {
                var absences = groupedAbsences[elem.name];
                return _.extend(elem, {value: absences ? absences.length : 0, absences: absences ? absences : []});
            });

            return result;
        };

        var getMonthYear = function (date) {
            return date.toLocaleString('it-IT', {month: 'short'}).toUpperCase() + ' ' + date.getFullYear();
        };
    });