'use strict';

//Setting up route
angular.module('aurea').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider

    .state('all schools', {
        url: '/scuole',
        templateUrl: 'views/schools/list.html'
    })

    .state('create school', {
        url: '/scuole/crea',
        templateUrl: 'views/schools/create.html',
        resolve: {
            provices: function (Provinces) {
                return Provinces.loadProvinces();
            }
        }
    })

    .state('edit school', {
        url: '/scuole/:schoolId/modifica',
        templateUrl: 'views/schools/edit.html',
        resolve: {
            provices: function (Provinces) {
                return Provinces.loadProvinces();
            }
        }
    })

    .state('school by id', {
        url: '/scuole/:schoolId',
        templateUrl: 'views/schools/view.html'
    })

    .state('all teachers', {
        url: '/insegnanti',
        templateUrl: 'views/teachers/list.html'
    })

    .state('create teacher', {
        url: '/insegnanti/crea',
        templateUrl: 'views/teachers/create.html'
    })

    .state('edit teacher', {
        url: '/insegnanti/:teacherId/modifica',
        templateUrl: 'views/teachers/edit.html'
    })

    .state('teacher by id', {
        url: '/insegnanti/:teacherId',
        templateUrl: 'views/teachers/view.html'
    })

    .state('all students', {
        url: '/alunni',
        templateUrl: 'views/students/list.html'
    })

    .state('create student', {
        url: '/alunni/crea',
        templateUrl: 'views/students/create.html'
    })

    .state('edit student', {
        url: '/alunni/:studentId/modifica',
        templateUrl: 'views/students/edit.html'
    })

    .state('student by id', {
        url: '/alunni/:studentId',
        templateUrl: 'views/students/view.html'
    })

    .state('all academic years', {
        url: '/aa',
        templateUrl: 'views/academicYears/list.html'
    })

    .state('create academic year', {
        url: '/aa/crea',
        templateUrl: 'views/academicYears/create.html'
    })

    .state('edit academic year', {
        url: '/aa/:academicYearId/modifica',
        templateUrl: 'views/academicYears/edit.html'
    })

    .state('academic year by id', {
        url: '/aa/:academicYearId',
        templateUrl: 'views/academicYears/view.html'
    })

    .state('all school classes', {
        url: '/classi',
        templateUrl: 'views/schoolClasses/list.html'
    })

    .state('create school class', {
        url: '/classi/crea',
        templateUrl: 'views/schoolClasses/create.html'
    })

    .state('edit school class', {
        url: '/classi/:schoolClassId/modifica',
        templateUrl: 'views/schoolClasses/edit.html'
    })

    .state('school class by id', {
        url: '/classi/:schoolClassId',
        templateUrl: 'views/schoolClasses/view.html'
    })

    .state('all teachings', {
        url: '/insegnamenti',
        templateUrl: 'views/teachings/list.html'
    })

    .state('create teaching', {
        url: '/insegnamenti/crea',
        templateUrl: 'views/teachings/create.html'
    })

    .state('edit teaching', {
        url: '/insegnamenti/:teachingId/modifica',
        templateUrl: 'views/teachings/edit.html'
    })

    .state('teaching by id', {
        url: '/insegnamenti/:teachingId',
        templateUrl: 'views/teachings/view.html'
    })

    .state('all time tables', {
        url: '/quadriOrari',
        templateUrl: 'views/timeTables/list.html'
    })

    .state('create time table', {
        url: '/quadriOrari/crea',
        templateUrl: 'views/timeTables/create.html'
    })

    .state('edit time table', {
        url: '/quadriOrari/:timeTableId/modifica',
        templateUrl: 'views/timeTables/edit.html'
    })

    .state('time table by id', {
        url: '/quadriOrari/:timeTableId',
        templateUrl: 'views/timeTables/view.html'
    })

    .state('class registry', {
        url: '/registroDiClasse',
        templateUrl: 'views/classRegistry/edit.html'
    })

    .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}]);

//Setting HTML5 Location Mode
angular.module('aurea').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

//Setting Lodash
angular.module('aurea').factory('_', [function() {
    return window._;
}]);