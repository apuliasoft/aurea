'use strict';

angular.module('aurea.timeTables').controller('TimeTablesCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'TimeTable', 'AcademicYear', function ($scope, $stateParams, $location, $filter, _, TimeTable, AcademicYear) {
    $scope.columns = [
        {name: '_id', label: 'ID'}
    ];

    if (!$scope.academicYear) {
        $scope.academicYears = AcademicYear.query();
    }

    $scope.getAcademicYearName = function (academicYearId) {
        var academicYear = _.find($scope.academicYears, function (academicYear) {
            return academicYear._id === academicYearId;
        });

        return academicYear && academicYear.name;
    };

    $scope.list = function () {
        $location.path('quadri-orari');
    };

    $scope.new = function () {
        $location.path('quadri-orari/crea');
    };

    $scope.view = function (timeTable) {
        if (timeTable) {
            $location.path('quadri-orari/' + timeTable._id);
        }
    };

    $scope.edit = function (timeTable) {
        if (timeTable) {
            $location.path('quadri-orari/' + timeTable._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.timeTable = new TimeTable();
        /* Inizializzo il Quadro Orario con 6 giorni della settimana
         e 6 slot per ogni giorno */
        $scope.timeTable.days = [];
        for (var i = 0; i < 6; i++) {
            $scope.timeTable.days.push({
                day: i,
                slots: [
                    {start: '08:00', end: '09:00'},
                    {start: '09:00', end: '10:00'},
                    {start: '10:00', end: '11:00'},
                    {start: '11:00', end: '12:00'},
                    {start: '12:00', end: '13:00'},
                    {start: '13:00', end: '14:00'}
                ]
                //TODO in produzione sostituire il blocco sottostante con quello presente sopra
                /*slots: [
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined},
                 {start: undefined, end: undefined}
                 ]*/
            });
        }
    };

    $scope.isNotEmptySlot = function (slot) {
        return slot.start && slot.end;
    };

    $scope.create = function () {
        var timeTable = $scope.timeTable;
        timeTable = serializeData(timeTable);

        timeTable.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

    $scope.update = function () {
        var timeTable = $scope.timeTable;
        timeTable = serializeData(timeTable);

        if (!timeTable.updated) {
            timeTable.updated = [];
        }
        timeTable.updated.push(new Date().getTime());

        timeTable.$update(function (response) {
            $scope.view(deserializeData(response));
        });
    };

    $scope.remove = function (timeTable) {
        if (timeTable) {
            timeTable.$remove();
            _.remove($scope.timeTables, timeTable);
            $scope.list();
        }
    };

    $scope.find = function () {
        $scope.timeTables = TimeTable.query();
    };

    $scope.findOne = function () {
        TimeTable.get({
            timeTableId: $stateParams.timeTableId
        }).$promise.then(function (timeTable) {
            $scope.timeTable = deserializeData(timeTable);
        });
    };

    /**
     * Elimina gli slot vuoti e converte il formato degli slot orari.
     * @param timeTable
     */
    var serializeData = function (timeTable) {

        timeTable.days = _.map(timeTable.days, function (day) {
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
     * Aggiunge gli slot vuoti se necessatio e converte il formato degli slot orari.
     * @param timeTable
     */
    var deserializeData = function (timeTable) {

        timeTable.days = _.map(timeTable.days, function (day) {

            day.slots = _.map(day.slots, function (slot) {
                return {
                    start: $filter('time')(slot.start),
                    end: $filter('time')(slot.end)
                };
            });

            for (var i = 0; i < (6 - day.slots.length); i++) {
                day.slots.push({start: undefined, end: undefined});
            }

            return day;
        });

        return timeTable;
    };
}]);