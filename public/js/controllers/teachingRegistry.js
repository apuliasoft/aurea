'use strict';

angular.module('aurea.teachingRegistry').controller('TeachingRegistryCtrl', ['$scope', '$stateParams', '$location', '$filter', '_', 'TeachingRegistry', 'Teaching', 'Student', function ($scope, $stateParams, $location, $filter, _, TeachingRegistry, Teaching, Student) {

    function getDateFromUrl () {
        var dateArray = $stateParams.teachingRegistryDate.split('-');
        return new Date(/*year*/dateArray[2], /*month*/dateArray[1]-1, /*day*/dateArray[0]);
    }

    if(!$scope.teachings) {
        $scope.teachings = Teaching.query();
    }

    if(!$scope.students) {
        $scope.students = Student.query();
    }


    $scope.init = function () {

        $scope.teachingRegistry = {};

        var day = getDateFromUrl();

        var tempTeachingRegistry = TeachingRegistry.get({
            teachingRegistryDate: day
        });
        tempTeachingRegistry.$promise.then(function(tempTeachingRegistry){
            if (!tempTeachingRegistry.day) {
                tempTeachingRegistry = new TeachingRegistry();

                // I mesi sono zero-based
                tempTeachingRegistry.day = day;
            }
            $scope.teachingRegistry = tempTeachingRegistry;
        });
    };

    $scope.tomorrow = function () {
        var day = getDateFromUrl();
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+1);
        $location.path('registri-personali/' + $filter('date')(newDay, 'd-M-yyyy'));
    };

    $scope.yesterday = function () {
        var day = getDateFromUrl();
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()-1);
        $location.path('registri-personali/' + $filter('date')(newDay, 'd-M-yyyy'));
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

        teachingRegistry._day = $filter('date')(teachingRegistry.day, 'yyyy-M-d');

        teachingRegistry.$update(function (response) {
            $scope.onUpdate(response);
        });
    };

    $scope.addVote = function(){
        if(!$scope.teachingRegistry.votes){
            $scope.teachingRegistry.votes = [];
        }

        $scope.teachingRegistry.votes.push({});
    };

    $scope.removeVote = function(vote){
        _.remove($scope.teachingRegistry.votes ,vote);
    };

    $scope.addPartial = function(vote){
        if(!vote.partials){
            vote.partials = [];
        }
        vote.partials.push({});
    };

    $scope.removePartial = function(vote, partial){
        _.remove(vote.partials, partial);
    };

    $scope.addAbsence = function(){
        if(!$scope.teachingRegistry.absences){
            $scope.teachingRegistry.absences = [];
        }

        $scope.teachingRegistry.absences.push({});
    };

    $scope.removeAbsence = function(absence){
        _.remove($scope.teachingRegistry.absences ,absence);
    };

}]);