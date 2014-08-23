'use strict';

//Setting up route
angular.module('aurea').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // FIXME sistemarlo ai fini della minificazione
        var checkLoggedin = function ($q, $timeout, $http, $location, _, Global) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') {
                    Global.setUser(user);
                    $timeout(deferred.resolve);
                } else { // Not Authenticated
                    if (Global.user != {}) {
                        Global.user = {};
                    }
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;

        };

        var checkSchoolSelected = ['$q', '$timeout', 'ngToast', 'Global', function($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getSchool()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare una scuola');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var checkComplexSelected = ['$q', '$timeout', 'ngToast', 'Global', function($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getComplex()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare un plesso');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var checkAcademicYearSelected = ['$q', '$timeout', 'ngToast', 'Global', function($q, $timeout, ngToast, Global) {
            var deferred = $q.defer();

            if (Global.getComplex()) {
                $timeout(deferred.resolve);
            } else {
                ngToast.create('Si prega di selezionare un anno accademico');
                $timeout(deferred.reject);
            }

            return deferred.promise;
        }];

        var logout = function ($q, $timeout, $http, $location, Global) {
            //FIXME sarebbe meglio se al logout tutto il servizio Global
            //      fosse reinizializzato perchè se cambia utente allora
            //      cambia tutto il contesto dell'applicazione

            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to logout user
            $http.post('/logout').success(function () {
                Global.setUser({});
                $timeout(deferred.reject);
                $location.url('/login');
            });

            return deferred.promise;
        };

        $httpProvider.responseInterceptors.push(['$rootScope', '$q', '$location', function (scope, $q, $location) {

            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;

                if (status === 401) {
                    $location.url('/401');
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

            .state('all teachers', {
                url: '/insegnanti',
                templateUrl: 'views/teachers/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('create teacher', {
                url: '/insegnanti/crea',
                templateUrl: 'views/teachers/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit teacher', {
                url: '/insegnanti/:teacherId/modifica',
                templateUrl: 'views/teachers/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('teacher by id', {
                url: '/insegnanti/:teacherId',
                templateUrl: 'views/teachers/view.html',
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
                url: '/alunni/crea',
                templateUrl: 'views/students/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit student', {
                url: '/alunni/:studentId/modifica',
                templateUrl: 'views/students/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('student by id', {
                url: '/alunni/:studentId',
                templateUrl: 'views/students/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('create parent', {
                url: '/alunni/:studentId/genitori/crea',
                templateUrl: 'views/parents/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit parent', {
                url: '/alunni/:studentId/genitori/:parentId/modifica',
                templateUrl: 'views/parents/edit.html',
                resolve: {
                    loggedin: checkLoggedin
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
                url: '/anni-accademici/crea',
                templateUrl: 'views/academicYears/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit academic year', {
                url: '/anni-accademici/:academicYearId/modifica',
                templateUrl: 'views/academicYears/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('academic year by id', {
                url: '/anni-accademici/:academicYearId',
                templateUrl: 'views/academicYears/view.html',
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
                url: '/classi/:schoolClassId/modifica',
                templateUrl: 'views/schoolClasses/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('school class by id', {
                url: '/classi/:schoolClassId',
                templateUrl: 'views/schoolClasses/view.html',
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
                url: '/insegnamenti/:teachingId/modifica',
                templateUrl: 'views/teachings/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('teaching by id', {
                url: '/insegnamenti/:teachingId',
                templateUrl: 'views/teachings/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('all time tables', {
                url: '/quadri-orari',
                templateUrl: 'views/timeTables/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('create time table', {
                url: '/quadri-orari/crea',
                templateUrl: 'views/timeTables/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('edit time table', {
                url: '/quadri-orari/:timeTableId/modifica',
                templateUrl: 'views/timeTables/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('time table by id', {
                url: '/quadri-orari/:timeTableId',
                templateUrl: 'views/timeTables/view.html',
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