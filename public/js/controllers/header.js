'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', '$localStorage', '$state', 'SmartState', '$stateParams', function ($scope, Global, $filter, $localStorage, $state, SmartState, $stateParams) {
    $scope.global = Global;

    $scope.$watch('global.user', function () {
        updateMenu();
    });

    $scope.goToSchool = function (school) {
        SmartState.go('all complexes', {
            schoolId: school._id
        });
        /*$state.go('all complexes', {
            schoolId: school._id
        });*/
    };

    $scope.goToComplex = function (complex) {
        $state.go('all academic years', {
            schoolId: $stateParams.schoolId,
            complexId: complex._id
        });
    };

    $scope.goToAcademicYear = function (academicYear) {
        $state.go('all school classes', {
            schoolId: $stateParams.schoolId,
            complexId: $stateParams.complexId,
            academicYearId: academicYear._id
        });
    };

    function updateMenu() {
        $scope.menu = [];

        if (!Global.isLoggedin()) return;

        if (Global.isAdmin()) {
            $scope.menu.push({
                'title': 'Utenti',
                'link': 'utenti',
                'ngif': Global.isAdmin
            });
        }

        $scope.menu.push({
            'title': 'Scuole',
            'link': 'scuole',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnanti',
            'link': 'insegnanti',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Alunni',
            'link': 'alunni',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Anni accademici',
            'link': 'anni-accademici',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Classi',
            'link': 'classi',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnamenti',
            'link': 'insegnamenti',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro di Classe',
            'link': 'registri-di-classe/' + $filter('date')(new Date(), 'yyyy-MM-dd'),
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro Personale',
            'link': 'registri-personali/' + $filter('date')(new Date(), 'd-M-yyyy')
        });
    }

    $scope.isCollapsed = false;


}]);
