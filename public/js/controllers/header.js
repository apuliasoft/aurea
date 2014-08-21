'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', '$localStorage', 'School', 'Complex', 'AcademicYear', function ($scope, Global, $filter, $localStorage, School, Complex, AcademicYear) {
    $scope.global = Global;

    if (!$scope.schools) {
        $scope.schools = School.query();
    }

    $scope.$watch('global.school', function () {

        if (Global.getSchool()) {
            var complex = Global.getComplex();
            var school = Global.getSchool();
            if (complex && complex.school !== school._id) {
                Global.removeComplex();
            }

            updateComplexes();
        }
    });

    $scope.$watch('global.complex', function () {

        if (Global.getComplex()) {
            var academicYear = Global.getAcademicYear();
            var complex = Global.getComplex();
            if (academicYear && academicYear.complex !== complex._id) {
                Global.removeAcademicYear();
            }

            updateAcademicYears();
        }
    });

    $scope.$watch('global.user', function () {
        updateMenu();
    });

    function updateComplexes() {
        $scope.complexes = Complex.query({
            schoolId: Global.getSchool() && Global.getSchool()._id
        });
    }

    function updateAcademicYears() {
        $scope.academicYears = AcademicYear.query({
            complexId: Global.getComplex() && Global.getComplex()._id
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
