'use strict';

angular.module('aurea.academicYears').controller('AcademicYearsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'AcademicYear', function ($scope, $stateParams, $location, $filter, _, Global, AcademicYear) {
    $scope.global = Global;

    var toMinute = $filter('minute');
    var toTime = $filter('time');

    $scope.goToListAcademicYears = function () {
        $location.path('anni-accademici');
    };

    $scope.goToCreateAcademicYear = function () {
        $location.path('anni-accademici/nuovo');
    };

    $scope.goToEditAcademicYear = function (academicYear) {
        if (academicYear) {
            $location.path('anni-accademici/' + academicYear._id);
        }
    };

    $scope.goToListTeachers = function () {
        $location.path('insegnanti');
    };

    $scope.goToListStudents = function () {
        $location.path('alunni');
    };

    $scope.goToListSchoolClasses = function (academicYear) {
        if (academicYear) {
            Global.setAcademicYear(academicYear);
            $location.path('classi');
        }
    };

    $scope.init = function () {
        $scope.academicYear = new AcademicYear({
            school: Global.getSchool()._id,
            complex: Global.getComplex()._id,
            timeTable: _.map(_.range(1, 8), function (num) {
                return {
                    weekDay: num,
                    slots: []
                };
            })

        });
    };

    $scope.addTimeSlot = function (slots) {
        var last = _.last(slots);
        var start = last.end;
        var lastDuration = toMinute(last.end) - toMinute(last.start);
        var end = toMinute(last.end) + lastDuration;
        if (end >= 0 && end < 1440) {
            end = toTime(end);
        } else {
            end = undefined;
        }

        slots.push({
            start: start,
            end: end
        });
    };

    $scope.addDayTimeSlots = function(timeTable, day) {
        var lastDay = _.findLast(timeTable, function(day) {
            return day.slots.length;
        });

        if (lastDay){
            day.slots = _.cloneDeep(lastDay.slots);
        } else {
            day.slots.push({
                start: undefined,
                end: undefined
            });
        }
    };

    $scope.removeTimeSlot = function (slots, index) {
        slots.splice(index, 1);
    };

    $scope.isNotEmptySlot = function (slot) {
        return slot.start && slot.end;
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

    $scope.find = function () {
        $scope.academicYears = AcademicYear.query({
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        });
    };

    $scope.findOne = function () {
        AcademicYear.get({
            academicYearId: $stateParams.academicYearId,
            complexId: Global.getComplex()._id,
            schoolId: Global.getSchool()._id
        }).$promise.then(function (academicYear) {
              academicYear.startDate = $filter('date')(academicYear.startDate, 'yyyy-MM-dd');
              academicYear.endDate = $filter('date')(academicYear.endDate, 'yyyy-MM-dd');
              academicYear.timeTable = deserializeData(academicYear.timeTable);

              $scope.academicYear = academicYear;
          });
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
}]);
