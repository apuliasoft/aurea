'use strict';

//Setting up route
angular.module('aurea').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

        var checkLoggedin = ['$q', '$timeout', '$http', '$location', 'Global', function ($q, $timeout, $http, $location, Global) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') {
                    Global.setUser(user);
                    $timeout(deferred.resolve);
                } else { // Not Authenticated
                    if (Global.user != {}) {
                        Global.user = {};
                    }
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;

        }];

        var checkSchoolSelected = ['$q', '$timeout', 'ngToast', 'Global', function ($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getSchool()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare una scuola');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var checkComplexSelected = ['$q', '$timeout', 'ngToast', 'Global', function ($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getComplex()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare un plesso');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var checkAcademicYearSelected = ['$q', '$timeout', 'ngToast', 'Global', function ($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getComplex()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare un anno accademico');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var logout = ['$q', '$timeout', '$http', '$location', 'Global', function ($q, $timeout, $http, $location, Global) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to logout user
            $http.post('/logout').success(function () {
                Global.setUser({});
                $timeout(deferred.reject);
                $location.url('/login');
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
              url: '/plessi',
              templateUrl: 'views/complexes/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  school: checkSchoolSelected
              }
          })

          .state('create complex', {
              url: '/plessi/nuovo',
              templateUrl: 'views/complexes/create.html',
              resolve: {
                  loggedin: checkLoggedin,
                  provices: function (Provinces) {
                      return Provinces.loadProvinces();
                  }
              }
          })

          .state('edit complex', {
              url: '/plessi/:complexId',
              templateUrl: 'views/complexes/edit.html',
              resolve: {
                  loggedin: checkLoggedin,
                  provices: function (Provinces) {
                      return Provinces.loadProvinces();
                  }
              }
          })

          .state('all academic years', {
              url: '/anni-accademici',
              templateUrl: 'views/academicYears/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create academic year', {
              url: '/anni-accademici/nuovo',
              templateUrl: 'views/academicYears/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit academic year', {
              url: '/anni-accademici/:academicYearId',
              templateUrl: 'views/academicYears/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all teachers', {
              url: '/insegnanti',
              templateUrl: 'views/teachers/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create teacher', {
              url: '/insegnanti/nuovo',
              templateUrl: 'views/teachers/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit teacher', {
              url: '/insegnanti/:teacherId',
              templateUrl: 'views/teachers/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all students', {
              url: '/alunni',
              templateUrl: 'views/students/list.html',
              resolve: {
                  loggedin: checkLoggedin,
                  schoolSelected: checkSchoolSelected
              }
          })

          .state('create student', {
              url: '/alunni/nuovo',
              templateUrl: 'views/students/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit student', {
              url: '/alunni/:studentId',
              templateUrl: 'views/students/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all parents', {
              url: '/genitori',
              templateUrl: 'views/parents/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create parent', {
              url: '/genitori/nuovo',
              templateUrl: 'views/parents/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit parent', {
              url: '/genitori/:parentId',
              templateUrl: 'views/parents/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all school classes', {
              url: '/classi',
              templateUrl: 'views/schoolClasses/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create school class', {
              url: '/classi/crea',
              templateUrl: 'views/schoolClasses/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit school class', {
              url: '/classi/:schoolClassId',
              templateUrl: 'views/schoolClasses/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('all teachings', {
              url: '/insegnamenti',
              templateUrl: 'views/teachings/list.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('create teaching', {
              url: '/insegnamenti/crea',
              templateUrl: 'views/teachings/create.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('edit teaching', {
              url: '/insegnamenti/:teachingId',
              templateUrl: 'views/teachings/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('class registry by date', {
              url: '/registri-di-classe/:date',
              templateUrl: 'views/classRegistry/edit.html',
              resolve: {
                  loggedin: checkLoggedin
              }
          })

          .state('teaching registry by date', {
              url: '/registri-personali/:teachingRegistryDate',
              templateUrl: 'views/teachingRegistry/edit.html',
              resolve: {
                  loggedin: checkLoggedin
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
