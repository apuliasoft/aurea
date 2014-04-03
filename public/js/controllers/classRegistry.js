'use strict';

angular.module('aurea.classRegistry').controller('ClassRegistryCtrl', ['$scope', '$stateParams', '$location', function ($scope, $stateParams, $location) {

    $scope.edit = function (timeTable) {
        if (timeTable) {
            $location.path('quadriOrari/' + timeTable._id + '/modifica');
        }
    };

    $scope.init = function () {
        $scope.classRegistry = {
            day: new Date(),
            slots: [
                {notes: ['Santoro è monello',''], substitution: false},
                {notes: [''], substitution: false},
                {notes: [''], substitution: false},
                {notes: [''], substitution: false},
                {notes: [''], substitution: false},
                {notes: [''], substitution: false}
            ]
        };
    };

    $scope.updateNotes = function (i, notes, note) {
        notes = $scope.classRegistry.slots[0].notes;
        console.log($scope.classRegistry);

        if(i == notes.length -1 && note !== ''){
            console.log('dentro');
            notes.push(Math.random());
        }

        return true;
    };
}]);