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
                {notes: [{value: ''}], substitution: false},
                {notes: [{value: ''}], substitution: false},
                {notes: [{value: ''}], substitution: false},
                {notes: [{value: ''}], substitution: false},
                {notes: [{value: ''}], substitution: false},
                {notes: [{value: ''}], substitution: false}
            ]
        };
    };


    $scope.addLastNote = function (notes) {
        //Aggiungo una nota alla fine se necessario
        if (notes[notes.length-1].value !== '') {
            notes.push({value: ''});
        }
    };

    $scope.cleanNotes = function (notes) {
        //Rimuovo tutte le note vuote
        for (var i = 0; i < notes.length-1; i++) {
            if (notes[i].value === '') {
                notes.splice(i, 1);
                i--;
            }
        }
    };

}]);