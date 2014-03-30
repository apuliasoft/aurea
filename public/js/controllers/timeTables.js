'use strict';

angular.module('aurea.timeTables').controller('TimeTablesCtrl', ['$scope', '$stateParams', '$location', '_', 'TimeTable', function ($scope, $stateParams, $location, _, TimeTable) {
    $scope.columns = [
        {name: 'day', label: 'Giorno'}
    ];

//    $scope.list = function () {
//        $location.path('insegnamenti');
//    };

    $scope.new = function () {
        $location.path('quadriOrari/crea');
    };
//
//    $scope.view = function (teaching) {
//        if (teaching) {
//            $location.path('insegnamenti/' + teaching._id);
//        }
//    };
//
//    $scope.edit = function (teaching) {
//        if (teaching) {
//            $location.path('insegnamenti/' + teaching._id + '/modifica');
//        }
//    };

    $scope.init = function () {
        $scope.timeTable = new TimeTable();
        $scope.timeTable.day = 0;
        $scope.timeTable.slots= [
            {start: undefined, end: undefined},
            {start: undefined, end: undefined},
            {start: undefined, end: undefined},
            {start: undefined, end: undefined},
            {start: undefined, end: undefined},
            {start: undefined, end: undefined}
        ];
    };

    $scope.create = function () {
        var timeTable = $scope.timeTable;

        timeTable.slots = timeTable.slots.filter(function(slot) {
            return slot.start !== undefined && slot.end !== undefined;
        });

        // converte il tipo Time da string del tipo 09:00 al numero totale di minuti
        var convertTime = function(time) {
            var timeArr = time.split(':');
            return parseInt(timeArr[0])*60 + parseInt(timeArr[1]);
        }

        timeTable.slots = timeTable.slots.map(function(slot){
            return {
              start: convertTime(slot.start),
              end: convertTime(slot.end)
            }
        });

        timeTable.$save(function (response) {
            $scope.view(response);
        });
        $scope.init();
    };

//    $scope.remove = function (teaching) {
//        if (teaching) {
//            teaching.$remove();
//            _.remove($scope.teachings, teaching);
//            $scope.list();
//        }
//    };
//
//    $scope.update = function () {
//        var teaching = $scope.teaching;
//        if (!teaching.updated) {
//            teaching.updated = [];
//        }
//        teaching.updated.push(new Date().getTime());
//
//        teaching.$update(function (response) {
//            $scope.view(response);
//        });
//    };

    $scope.find = function () {
        $scope.timeTables = TimeTable.query();
    };

//    $scope.findOne = function () {
//        $scope.teaching = Teaching.get({
//            teachingId: $stateParams.teachingId
//        });
//    };
}]);