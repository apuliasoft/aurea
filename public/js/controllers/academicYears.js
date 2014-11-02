'use strict';

angular.module('aurea.academicYears')
    .controller('AcademicYearsCtrl', function ($scope, $stateParams, SmartState, $filter, _, Global, AcademicYear) {
        $scope.global = Global;

        var toMinute = $filter('minute');
        var toTime = $filter('time');

        $scope.goToListAcademicYears = function () {
            SmartState.go('all academic years');
        };

        $scope.goToCreateAcademicYear = function () {
            SmartState.go('create academic year');
        };

        $scope.goToEditAcademicYear = function (academicYear) {
            SmartState.go('edit academic year', { academicYearId: academicYear._id });
        };

        $scope.goToListSchoolClasses = function (academicYear) {
            SmartState.go('all school classes', { academicYearId: academicYear._id });
        };

        $scope.init = function () {
            $scope.academicYear = new AcademicYear({
                school: Global.getSchool()._id,
                complex: Global.getComplex()._id,
                timeTable: _.map(_.range(1, 8), function (num) {
                    return {
                        weekDay: num,
                        active: false,
                        slots: [{
                            start: new Date(1970, 0, 1, 8, 30, 0),
                            end: new Date(1970, 0, 1, 9, 30, 0)
                        }]
                    };
                })

            });
        };

        $scope.findOne = function () {
            AcademicYear.get({
                academicYearId: $stateParams.academicYearId,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (academicYear) {
                    academicYear.startDate = $filter('date')(academicYear.startDate, 'yyyy-MM-dd');
                    academicYear.endDate = $filter('date')(academicYear.endDate, 'yyyy-MM-dd');
                    academicYear.timeTable = deserializeData(academicYear.timeTable);

                    var baseTimeTable = _.map(_.range(1, 8), function (num) {
                        return {
                            weekDay: num,
                            slots: []
                        };
                    });

                    academicYear.timeTable = _.extend(baseTimeTable, academicYear.timeTable);

                    $scope.academicYear = academicYear;
                });
        };

        $scope.find = function () {
            AcademicYear.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (academicYears) {
                    $scope.academicYears = academicYears;
                });
        };

        $scope.addTimeSlot = function (day) {
            var last = _.last(day.slots);
            var start = new Date(last.end.valueOf());
            var lastDuration = last.end.valueOf() - last.start.valueOf();
            var end = new Date(last.end.valueOf() + lastDuration);

            day.slots.push({
                start: start,
                end: end
            });
        };

        $scope.addDayTimeSlots = function (timeTable, day) {
            var lastDay = _.findLast(timeTable, function (day) {
                return day.slots.length;
            });

            if (lastDay) {
                day.slots = _.cloneDeep(lastDay.slots);
            } else {
                day.slots.push({
                    start: undefined,
                    end: undefined
                });
            }
        };

        $scope.removeDayTimeSlots = function (day) {
            day.slots.splice(0, day.slots.length);
        };

        $scope.removeTimeSlot = function (slots, index) {
            slots.splice(index, 1);
        };

        $scope.isNotEmptySlot = function (slot) {
            return slot.start && slot.end;
        };

        $scope.areAllDaysRemoved = function (timeTables) {
            return _.find(timeTables, function (timeTable) {
                return timeTable.slots.length === 0;
            });
        };

        $scope.areAllDaysAdded = function (timeTables) {
            return _.find(timeTables, function (timeTable) {
                return timeTable.slots.length > 0;
            });
        };

        $scope.slotsFilled = function (slots) {
            return _.every(slots, $scope.slotFilled);
        };

        $scope.slotFilled = function (slot) {
            return slot.start && slot.end;
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var academicYear = $scope.academicYear;
                academicYear.timeTable = serializeData(academicYear.timeTable);

                academicYear.$save(function () {
                    $scope.goToListAcademicYears();
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var academicYear = $scope.academicYear;
                academicYear.timeTable = serializeData(academicYear.timeTable);

                if (!academicYear.updated) {
                    academicYear.updated = [];
                }
                academicYear.updated.push(new Date().getTime());

                academicYear.$update(function (response) {
                    $scope.goToListAcademicYears(response);
                });
            }
        };

        $scope.remove = function (academicYear) {
            if (academicYear) {
                academicYear.$remove();
                _.remove($scope.academicYears, academicYear);
                $scope.goToListAcademicYears();
            }
        };

        /**
         * Elimina gli slot vuoti e converte il formato degli slot orari.
         * @param timeTable
         */
        var serializeData = function (timeTable) {

            timeTable = _.map(timeTable, function (day) {
                day.slots = _.filter(day.slots, function (slot) {
                    return $scope.isNotEmptySlot(slot);
                });

                day.slots = _.map(day.slots, function (slot) {
                    return {
                        start: $filter('minute')(slot.start),
                        end: $filter('minute')(slot.end)
                    };
                });

                return day;
            });

            return timeTable;
        };

        /**
         * Aggiunge gli slot vuoti se necessario e converte il formato degli slot orari.
         * @param timeTable
         */
        var deserializeData = function (timeTable) {

            timeTable = _.map(timeTable, function (day) {

                day.slots = _.map(day.slots, function (slot) {
                    return {
                        start: $filter('time')(slot.start),
                        end: $filter('time')(slot.end)
                    };
                });

                return day;
            });

            return timeTable;
        };
    });
