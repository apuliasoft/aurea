'use strict';

angular.module('aurea.system').controller('MenuCtrl', ['$scope', 'Global', '$filter', '$localStorage', 'School', 'Complex', 'AcademicYear', 'SchoolClass', function ($scope, Global, $filter, $localStorage, School, Complex, AcademicYear, SchoolClass) {
    $scope.global = Global;

    $scope.$watch('global.user', function () {
        updateMenu();
    });

    /*$scope.$watch('global.user', function () {
        updateMenu();

        if (!Global.isLoggedin())
            return;

        if (Global.user.school) {
            School.get({
                schoolId: Global.user.school
            }).$promise
              .then(function (school) {
                  $scope.schools = [school];
                  Global.setSchool(school);
              });
        } else {
            $scope.schools = School.query();
        }

    });

    $scope.$watch('global.school', function () {
        Global.removeComplex();

        if (!Global.isLoggedin())
            return;

        if (Global.getSchool()) {
            if (Global.user.complex) {
                Complex.get({
                    schoolId: Global.getSchool()._id,
                    complexId: Global.user.complex
                }).$promise
                  .then(function (complex) {
                      $scope.complexes = [complex];
                      Global.setComplex(complex);
                  });
            } else {
                $scope.complexes = Complex.query({ schoolId: Global.getSchool()._id });
            }
        }
    });

    $scope.$watch('global.complex', function () {
        Global.removeAcademicYear();

        if (!Global.isLoggedin())
            return;

        if (Global.getComplex()) {
            $scope.academicYears = AcademicYear.query({
                schoolId: Global.getSchool() && Global.getSchool()._id,
                complexId: Global.getComplex() && Global.getComplex()._id
            });
        }
    });

    $scope.$watch('global.academicYear', function () {
        if (!Global.isLoggedin())
            return;

        if (Global.getAcademicYear()) {
            var schoolClass = Global.getSchoolClass();
            var academicYear = Global.getAcademicYear();
            if (schoolClass && schoolClass.academicYear !== academicYear._id) {
                Global.removeSchoolClass();
            }

            updateSchoolClasses();
        }
    });

    function updateSchoolClasses() {
        $scope.schoolClasses = SchoolClass.query({
            academicYearId: Global.getAcademicYear() && Global.getAcademicYear()._id,
            complexId: Global.getComplex() && Global.getComplex()._id,
            schoolId: Global.getSchool() && Global.getSchool()._id
        });
    }*/

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
