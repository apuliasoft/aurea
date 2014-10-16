'use strict';

angular.module('aurea.teachingRegistry')
    .controller('TeachingRegistryCtrl', function ($scope, $stateParams, $location, $filter, ngToast, _, SmartState, Global, TeachingRegistry, ClassStudent, teachingRegistry) {

        $scope.$watch('teachingRegistry.date', function () {
            if ($scope.teachingRegistry) {
                var day = new Date($scope.teachingRegistry.date);
                SmartState.go('teaching registry by date', {
                    date: $filter('date')(day, 'yyyy-MM-dd')
                });
            }
        });

        $scope.init = function () {

            // Carico gli studenti della classe
            $scope.classStudents = ClassStudent.query({
                schoolClassId: Global.getSchoolClass()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id,
                academicYearId: Global.getAcademicYear()._id
            });

            $scope.minDate = new Date(Global.getAcademicYear().startDate);

            $scope.maxDate = new Date(Global.getAcademicYear().endDate);

            var date = new Date($stateParams.date);

            Global.title = 'Registro di ' + Global.getTeaching().name;
            Global.subtitle = Global.getSchoolClass().name;

            $scope.teachingRegistry = teachingRegistry;

            $scope.weekdays = _.map(_.filter(Global.getAcademicYear().timeTable, function (slot) {
                return slot.slots.length > 0;
            }), function (item) {
                return item.weekDay === 7 ? 0 : item.weekDay;
            });

            var prevdate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            var nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

            $scope.prevDisabled = prevdate < new Date($scope.minDate.setHours(0, 0, 0, 0));
            $scope.nextDisabled = nextDate > new Date($scope.maxDate.setHours(0, 0, 0, 0));

        };

        $scope.tomorrow = function () {
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

        $scope.yesterday = function () {
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

        $scope.onUpdate = function (teachingRegistry) {
            console.log('Aggiornato con successo:');
            console.log(teachingRegistry);
        };

        $scope.save = function () {
            var teachingRegistry = $scope.teachingRegistry;

            if (!teachingRegistry.updated) {
                teachingRegistry.updated = [];
            }
            teachingRegistry.updated.push(new Date().getTime());

            teachingRegistry._date = teachingRegistry.date;

            teachingRegistry.$update(function () {
                ngToast.create('Salvataggio riuscito.');
            });
        };

        // UTILITY FUNCTIONS

        $scope.dateOptions = {
            startingDay: 1,
            showWeeks: false,
            datepickerMode: 'day'
        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        // Disabilita i giorni per cui non c'è la timetable
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && !_.contains($scope.weekdays, date.getDay()));
        };

        $scope.addVote = function () {
            if (!$scope.teachingRegistry.votes) {
                $scope.teachingRegistry.votes = [];
            }

            $scope.teachingRegistry.votes.push({});
        };

        $scope.removeVote = function (vote) {
            _.remove($scope.teachingRegistry.votes, vote);
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

        $scope.addAbsence = function () {
            if (!$scope.teachingRegistry.absences) {
                $scope.teachingRegistry.absences = [];
            }

            $scope.teachingRegistry.absences.push({});
        };

        $scope.removeAbsence = function (absence) {
            _.remove($scope.teachingRegistry.absences, absence);
        };

    });