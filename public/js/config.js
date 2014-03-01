//Setting up route
angular.module('aurea')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/scuole', {
          templateUrl: 'views/school/list.html',
          controller: 'SchoolCtrl'
        }).
        when('/scuole/crea', {
          templateUrl: 'views/school/create.html',
          controller: 'SchoolCtrl',
          resolve: {
            provices: function (Province) {
              return Province.loadProvinces();
            }
          }
        }).
        when('/scuole/:schoolId/modifica', {
          templateUrl: 'views/school/edit.html',
          controller: 'SchoolCtrl',
          resolve: {
            provices: function (Province) {
              return Province.loadProvinces();
            }
          }
        }).
        when('/scuole/:schoolId', {
          templateUrl: 'views/school/view.html',
          controller: 'SchoolCtrl'
        }).
        when('/insegnanti', {
          templateUrl: 'views/teacher/list.html',
          controller: 'TeacherCtrl'
        }).
        when('/insegnanti/crea', {
          templateUrl: 'views/teacher/create.html',
          controller: 'TeacherCtrl'
        }).
        when('/insegnanti/:teacherId/modifica', {
          templateUrl: 'views/teacher/edit.html',
          controller: 'TeacherCtrl'
        }).
        when('/insegnanti/:teacherId', {
          templateUrl: 'views/teacher/view.html',
          controller: 'TeacherCtrl'
        }).
        when('/alunni', {
          templateUrl: 'views/student/list.html',
          controller: 'StudentCtrl'
        }).
        when('/alunni/crea', {
          templateUrl: 'views/student/create.html',
          controller: 'StudentCtrl'
        }).
        when('/alunni/:studentId/modifica', {
          templateUrl: 'views/student/edit.html',
          controller: 'StudentCtrl'
        }).
        when('/alunni/:studentId', {
          templateUrl: 'views/student/view.html',
          controller: 'StudentCtrl'
        }).
        when('/aa', {
          templateUrl: 'views/academicYear/list.html',
          controller: 'AcademicYearCtrl'
        }).
        when('/aa/crea', {
          templateUrl: 'views/academicYear/create.html',
          controller: 'AcademicYearCtrl'
        }).
        when('/aa/:academicYearId/modifica', {
          templateUrl: 'views/academicYear/edit.html',
          controller: 'AcademicYearCtrl'
        }).
        when('/aa/:academicYearId', {
          templateUrl: 'views/academicYear/view.html',
          controller: 'AcademicYearCtrl'
        }).
        when('/', {
          templateUrl: 'views/index.html',
          controller: 'IndexCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
  ]);

//Setting HTML5 Location Mode
angular.module('aurea')
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix("!");
    }
  ]);