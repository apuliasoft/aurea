'use strict';

angular.module('aurea.teachingRegistry').controller('TeachingRegistryCtrl', ['$scope', '$stateParams', '$location', '$filter', 'ngToast', '_', 'SmartState', 'Global', 'TeachingRegistry', 'ClassStudent', function ($scope, $stateParams, $location, $filter, ngToast, _, SmartState, Global, TeachingRegistry, ClassStudent) {

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

        var date = new Date($stateParams.date);
        var schoolClass = Global.getSchoolClass()._id;
        var school = Global.getSchool()._id;
        var complex = Global.getComplex()._id;
        var academicYear = Global.getAcademicYear()._id;
        var teaching = Global.getTeaching()._id;

        TeachingRegistry.get({
            schoolClassId: schoolClass,
            date: date.toISOString(),
            schoolId: school,
            complexId: complex,
            academicYearId: academicYear,
            teachingId: teaching
        }).$promise.then(function (teachingRegistry) {
              Global.title = 'Registro di ' + Global.getTeaching().name;
              Global.subtitle = Global.getSchoolClass().name;

              $scope.teachingRegistry = teachingRegistry;
          });
    };

    $scope.tomorrow = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()+1);

        SmartState.go('teaching registry by date', {
            date: $filter('date')(newDay, 'yyyy-MM-dd')
        });
    };

    $scope.yesterday = function () {
        var day = new Date($stateParams.date);
        var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()-1);

        SmartState.go('teaching registry by date', {
            date: $filter('date')(newDay, 'yyyy-MM-dd')
        });
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