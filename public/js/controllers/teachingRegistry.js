'use strict';

angular.module('aurea.teachingRegistry')
    .controller('TeachingRegistryCtrl', function ($scope, $filter, $stateParams, $mdDialog, $mdSidenav, $mdToast, _, SmartState, Global, TeachingRegistry, ClassStudent) {

        $scope.$watch('teachingRegistry.date', function () {
            if ($scope.teachingRegistry) {
                var day = new Date($scope.teachingRegistry.date);
                SmartState.go('teaching registry by date', {
                    date: $filter('date')(day, 'yyyy-MM-dd')
                });
            }
        });

        $scope.goPrevDay = function () {
            var day = new Date($stateParams.date);
            var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
            var found = false;
            while (!found) {
                if (_.contains($scope.weekdays, newDay.getDay())) {
                    SmartState.go('teaching registry by date', {
                        date: $filter('date')(newDay, 'yyyy-MM-dd')
                    });
                    found = true;
                } else {
                    newDay = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate() - 1);
                }
            }
        };

        $scope.goNextDay = function () {
            var day = new Date($stateParams.date);
            var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            var found = false;
            while (!found) {
                if (_.contains($scope.weekdays, newDay.getDay())) {
                    SmartState.go('teaching registry by date', {
                        date: $filter('date')(newDay, 'yyyy-MM-dd')
                    });
                    found = true;
                } else {
                    newDay = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate() + 1);
                }
            }
        };

        $scope.init = function () {
            var date = new Date($stateParams.date);

            // Carico gli studenti della classe
            $scope.classStudents = ClassStudent.query({
                schoolClassId: Global.getSchoolClass()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id,
                academicYearId: Global.getAcademicYear()._id
            });

            // Carico la pagina di registro personale
            TeachingRegistry.get({
                date: date.toISOString(),
                teachingId: Global.getTeaching()._id,
                schoolClassId: Global.getSchoolClass()._id,
                academicYearId: Global.getAcademicYear()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (teachingRegistry) {
                    $scope.teachingRegistry = teachingRegistry;
                });

            $scope.minDate = new Date(Global.getAcademicYear().startDate);

            $scope.maxDate = new Date(Global.getAcademicYear().endDate);

            $scope.selectedStudents = [];

            $scope.weekdays = _.map(Global.getAcademicYear().timeTable, function (slot) {
                return slot.weekDay;
            });

            var prevDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            var nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

            $scope.prevDisabled = prevDate < new Date($scope.minDate.setHours(0, 0, 0, 0));
            $scope.nextDisabled = nextDate > new Date($scope.maxDate.setHours(0, 0, 0, 0));
        };

        $scope.save = function () {
            var teachingRegistry = $scope.teachingRegistry;

            if (!teachingRegistry.updated) {
                teachingRegistry.updated = [];
            }
            teachingRegistry.updated.push(new Date().getTime());

            teachingRegistry._date = teachingRegistry.date;

            teachingRegistry.$update(function () {
                $mdToast.show({
                    template: '<md-toast>Salvataggio riuscito.</md-toast>',
                    hideDelay: 2000
                });
            });
        };

//        // UTILITY FUNCTIONS
//
//        $scope.dateOptions = {
//          startingDay: 1,
//          showWeeks: false,
//          datepickerMode: 'day'
//        };
//
//        $scope.open = function ($event) {
//          $event.preventDefault();
//          $event.stopPropagation();
//          $scope.opened = true;
//        };
//
//        // Disabilita i giorni per cui non c'è la timetable
//        $scope.disabled = function (date, mode) {
//          return ( mode === 'day' && !_.contains($scope.weekdays, date.getDay()));
//        };

        $scope.clearSelection = function () {
            _.each(selectedStudents(), function (classStudent) {
                classStudent.selected = false;
            });
        };

        $scope.noneSelected = function () {
            return selectedStudents().length === 0;
        };

        $scope.addVote = function () {
            if (!$scope.teachingRegistry.votes) {
                $scope.teachingRegistry.votes = [];
            }

            _.forEach(selectedStudents(), function (student) {
                $scope.teachingRegistry.votes.push({
                    student: student._id,
                    partials: [{}]
                });
            });

            $scope.clearSelection();
        };

        $scope.removeVote = function (vote) {
            _.remove($scope.teachingRegistry.votes, vote);
        };

        $scope.studentHasVote = function (student) {
            return $scope.teachingRegistry &&
                _.find($scope.teachingRegistry.votes, function (vote) {
                    return vote.student === student._id;
                });
        };

        $scope.addPartial = function (vote) {
            if (!vote.partials) {
                vote.partials = [];
            }
            vote.partials.push({});
        };

        $scope.removePartial = function (vote, partial) {
            _.remove(vote.partials, partial);
        };

        $scope.toggleAbsents = function () {
            var students = selectedStudents();
            var noAbsentStudents = _.filter(students, function(student) {
                return !_.find($scope.teachingRegistry.absences, { student: student._id });
            });

            if(noAbsentStudents.length) {
                _.forEach(noAbsentStudents, function(noAbsentStudent) {
                    $scope.teachingRegistry.absences.push({
                        student: noAbsentStudent._id,
                        slots: 1
                    });
                });
            } else {
                _.forEach(students, function(student) {
                    _.remove($scope.teachingRegistry.absences, { student: student._id });
                });
            }

            $scope.clearSelection();
        };

        $scope.studentIsAbsent = function (student) {
            return $scope.teachingRegistry &&
                _.find($scope.teachingRegistry.absences, function (absence) {
                    return absence.student === student._id;
                });
        };

        var selectedStudents = function () {
            return _.filter($scope.classStudents, 'selected');
        };
    });