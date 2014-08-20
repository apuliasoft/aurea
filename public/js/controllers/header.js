'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', '$localStorage', 'Complex', 'AcademicYear', function ($scope, Global, $filter, $localStorage, Complex, AcademicYear) {
    $scope.global = Global;

    if (!$scope.complexes) {
        $scope.complexes = Complex.query();
    }

    $scope.$watch('global.complex', function () {

        var academicYear  = Global.getAcademicYear();
        var complex = Global.getComplex();
        if(academicYear && academicYear.complex !== complex._id){
            Global.removeAcademicYear();
        }

        updateAcademicYears();
    });

    $scope.$watch('global.user', function () {
        updateMenu();
    });

    function updateAcademicYears() {
        $scope.academicYears = AcademicYear.query({
            complexId: Global.getComplex()._id
        });
    }

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
            'link': 'registri-di-classe/53f1ffd35f8fddfd599e6c9b/' + $filter('date')(new Date(), 'yyyy-MM-dd'),
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro Personale',
            'link': 'registri-personali/' + $filter('date')(new Date(), 'd-M-yyyy')
        });
    }

    $scope.isCollapsed = false;


}]);
