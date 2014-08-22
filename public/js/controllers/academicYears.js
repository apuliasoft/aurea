'use strict';

angular.module('aurea.academicYears').controller('AcademicYearsCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'Global', 'AcademicYear', function ($scope, $stateParams, $location, $filter, _, Global, AcademicYear) {
    $scope.global = Global;

    $scope.columns = [
        {name: 'name', label: 'Nome'},
        {name: 'startDate', label: 'Data inizio', filter: 'date'},
        {name: 'endDate', label: 'Data fine', filter: 'date'}
    ];

    $scope.list = function () {
        $location.path('anni-accademici');
    };

    $scope.new = function () {
        $location.path('anni-accademici/crea');
    };

    $scope.view = function (academicYear) {
        if (academicYear) {
            $location.path('anni-accademici/' + academicYear._id);
        }
    };

    $scope.edit = function (academicYear) {
        if (academicYear) {
            $location.path('anni-accademici/' + academicYear._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.academicYear = new AcademicYear();
        $scope.academicYear.school = Global.getSchool()._id;
        $scope.academicYear.complex = Global.getComplex()._id;
        $scope.academicYear.timeTable = _.map(_.range(1, 8), function (num) {
            return {
                weekDay: num,
                slots: []
            };
        });
    };

    $scope.addTimeSlot = function(slots) {
        slots.push({start: _.last(slots) && _.last(slots).end || undefined, end: undefined});
    };

    $scope.removeTimeSlot = function(slots, index) {
        slots.splice(index, 1);
    };

    $scope.isNotEmptySlot = function (slot) {
        return slot.start && slot.end;
    };

    $scope.slotsFilled = function(slots) {
        return _.every(slots, $scope.slotFilled);
    };

    $scope.slotFilled = function(slot) {
        return slot.start && slot.end;
    };

    $scope.create = function (isValid) {
        if(isValid) {
            var academicYear = $scope.academicYear;
            academicYear.timeTable = serializeData(academicYear.timeTable);

            academicYear.$save(function (response) {
                $scope.view(response);
            });
        }
    };

    $scope.remove = function (academicYear) {
        if (academicYear) {
            academicYear.$remove();
            _.remove($scope.academicYears, academicYear);
            $scope.list();
        }
    };

    $scope.update = function (isValid) {
        if(isValid) {
            var academicYear = $scope.academicYear;
            academicYear.timeTable = serializeData(academicYear.timeTable);

            if (!academicYear.updated) {
                academicYear.updated = [];
            }
            academicYear.updated.push(new Date().getTime());

            academicYear.$update(function (response) {
                $scope.view(response);
            });
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