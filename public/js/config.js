'use strict';

//Setting up route
angular.module('aurea').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

        var checkLoggedin = ['$q', '$http', '$location', 'Global', function ($q, $http, $location, Global) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') {
                    Global.setUser(user);
                    deferred.resolve();
                } else { // Not Authenticated
                    if (Global.getUser() !== {}) {
                        Global.setUser({});
                    }

                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;

        }];

        var checkSchool = ['$q', 'ngToast', '$stateParams', 'School', 'Global', function ($q, ngToast, $stateParams, School, Global) {
            var deferred = $q.defer();

            Global.setSchool($stateParams.schoolId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'La scuola selezionata non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var checkComplex = ['$q', 'ngToast', '$stateParams', 'Complex', 'Global', function ($q, ngToast, $stateParams, Complex, Global) {
            var deferred = $q.defer();

            Global.setComplex($stateParams.schoolId, $stateParams.complexId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'Il plesso selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var checkAcademicYear = ['$q', 'ngToast', '$stateParams', 'AcademicYear', 'Global', function ($q, ngToast, $stateParams, AcademicYear, Global) {
            var deferred = $q.defer();

            Global.setAcademicYear($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'L\'anno accademico selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var checkSchoolClass = ['$q', 'ngToast', '$stateParams', 'AcademicYear', 'Global', function ($q, ngToast, $stateParams, AcademicYear, Global) {
            var deferred = $q.defer();

            Global.setSchoolClass($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId, $stateParams.schoolClassId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'La classe selezionata non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var checkStudent = ['$q', 'ngToast', '$stateParams', 'Student', 'Global', function ($q, ngToast, $stateParams, Student, Global) {
            var deferred = $q.defer();

            Global.setStudent($stateParams.schoolId, $stateParams.complexId, $stateParams.studentId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'Lo studente selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var checkTeaching = ['$q', 'ngToast', '$stateParams', 'Global', function ($q, ngToast, $stateParams, Global) {
            var deferred = $q.defer();
            Global.setTeaching($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId, $stateParams.schoolClassId, $stateParams.teachingId)
              .then(function () {
                  deferred.resolve();
              }, function () {
                  ngToast.create({
                      content: 'L\'insegnamento selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.',
                      class: 'warning'
                  });
                  deferred.reject();
              });

            return deferred.promise;
        }];

        var logout = ['$q', '$http', '$location', 'Global', 'SmartState', function ($q, $http, $location, Global, SmartState) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to logout user
            $http.post('/logout').success(function () {
                Global.setUser({});
                deferred.reject();
                SmartState.go('login user');
            });

            return deferred.promise;
        }];

        $httpProvider.responseInterceptors.push(['$rootScope', '$q', '$location', function (scope, $q, $location) {

            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;

                switch (status) {
                    case 401:
                        $location.url('/401');
                        return;
                    case 404:
                        $location.url('/404');
                        return;
                }

                // otherwise
                return $q.reject(response);

            }

            return function (promise) {
                return promise.then(success, error);
            };

        }]);

        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider

          .state('login user', {
              url: '/login',
              templateUrl: 'views/login.html'
          })

          .state('logout user', {
              url: '/logout',
              resolve: {
                  logout: logout
              }
          })

          .state('not authorized', {
              url: '/401',
              templateUrl: 'views/401.html'
          })

          .state('not found', {
              url: '/404',
              templateUrl: 'views/404.html'
          })

          .state('all users', {
              url: '/utenti',
              templateUrl: 'views/users/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create user', {
              url: '/utenti/crea',
              templateUrl: 'views/users/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit user', {
              url: '/utenti/:userId/modifica',
              templateUrl: 'views/users/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('user by id', {
              url: '/utenti/:userId',
              templateUrl: 'views/users/view.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all schools', {
              url: '/scuole',
              templateUrl: 'views/schools/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create school', {
              url: '/scuole/nuova',
              templateUrl: 'views/schools/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit school', {
              url: '/scuole/:schoolId',
              templateUrl: 'views/schools/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  provices: ['Provinces', function (Provinces) {
                      return Provinces.loadProvinces();
                  }]
              }
          })

          .state('all complexes', {
              url: '/scuole/:schoolId/plessi',
              templateUrl: 'views/complexes/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool
              }
          })

          .state('create complex', {
              url: '/scuole/:schoolId/plessi/nuovo',
              templateUrl: 'views/complexes/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  provices: function (Provinces) {
                      return Provinces.loadProvinces();
                  }
              }
          })

          .state('edit complex', {
              url: '/scuole/:schoolId/plessi/:complexId',
              templateUrl: 'views/complexes/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  provices: function (Provinces) {
                      return Provinces.loadProvinces();
                  }
              }
          })

          .state('all academic years', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici',
              templateUrl: 'views/academicYears/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('create academic year', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/nuovo',
              templateUrl: 'views/academicYears/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('edit academic year', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId',
              templateUrl: 'views/academicYears/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('all teachers', {
              url: '/scuole/:schoolId/plessi/:complexId/insegnanti',
              templateUrl: 'views/teachers/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('create teacher', {
              url: '/scuole/:schoolId/plessi/:complexId/insegnanti/nuovo',
              templateUrl: 'views/teachers/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('edit teacher', {
              url: '/scuole/:schoolId/plessi/:complexId/insegnanti/:teacherId',
              templateUrl: 'views/teachers/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('all students', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni',
              templateUrl: 'views/students/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('create student', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni/nuovo',
              templateUrl: 'views/students/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('edit student', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId',
              templateUrl: 'views/students/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex
              }
          })

          .state('all parents', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId/genitori',
              templateUrl: 'views/parents/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  student: checkStudent
              }
          })

          .state('create parent', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId/genitori/nuovo',
              templateUrl: 'views/parents/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  student: checkStudent
              }
          })

          .state('edit parent', {
              url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId/genitori/:parentId',
              templateUrl: 'views/parents/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  student: checkStudent
              }
          })

          .state('all school classes', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi',
              templateUrl: 'views/schoolClasses/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear
              }
          })

          .state('create school class', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/crea',
              templateUrl: 'views/schoolClasses/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear
              }
          })

          .state('edit school class', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId',
              templateUrl: 'views/schoolClasses/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear
              }
          })

          .state('all teachings', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId/insegnamenti',
              templateUrl: 'views/teachings/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear,
                  schoolClass: checkSchoolClass
              }
          })

          .state('create teaching', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId/insegnamenti/crea',
              templateUrl: 'views/teachings/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear,
                  schoolClass: checkSchoolClass
              }
          })

          .state('edit teaching', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId/insegnamenti/:teachingId',
              templateUrl: 'views/teachings/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear,
                  schoolClass: checkSchoolClass
              }
          })

          .state('class registry by date', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId/registri-di-classe/:date',
              templateUrl: 'views/classRegistry/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear,
                  schoolClass: checkSchoolClass
              }
          })

          .state('teaching registry by date', {
              url: '/scuole/:schoolId/plessi/:complexId/anni-accademici/:academicYearId/classi/:schoolClassId/insegnamenti/:teachingId/registri-personali/:date',
              templateUrl: 'views/teachingRegistry/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchool,
                  complex: checkComplex,
                  academicYear: checkAcademicYear,
                  schoolClass: checkSchoolClass,
                  teaching: checkTeaching
              }
          })

          .state('home', {
              url: '/',
              templateUrl: 'views/index.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          });
    }]);

//Setting HTML5 Location Mode
angular.module('aurea').config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }]);

//Setting Lodash
angular.module('aurea').factory('_', [function () {
    return window._;
}]);
