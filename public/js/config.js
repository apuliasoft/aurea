'use strict';

//Setting up route
angular.module('aurea')
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $analyticsProvider) {

        $analyticsProvider.virtualPageviews(true);

        var checkLoggedin = ['$q', '$http', 'SmartState', 'Global', function ($q, $http, SmartState, Global) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') {
                    Global.setCurrentUser(user);
                    deferred.resolve();
                } else { // Not Authenticated
                    if (Global.getCurrentUser() !== {}) {
                        Global.setCurrentUser({});
                    }

                    SmartState.go('login user');
                    deferred.reject();
                }
            });

            return deferred.promise;

        }];

        var checkUser = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setUser($stateParams.userId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>L\'utente selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkSchool = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setSchool($stateParams.schoolId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>La scuola selezionata non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkComplex = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setComplex($stateParams.schoolId, $stateParams.complexId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>Il plesso selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkAcademicYear = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setAcademicYear($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>L\'anno scolastico selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkSchoolClass = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setSchoolClass($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId, $stateParams.schoolClassId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>La classe selezionata non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkStudent = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setStudent($stateParams.schoolId, $stateParams.complexId, $stateParams.studentId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>Lo studente selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkParent = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setParent($stateParams.schoolId, $stateParams.complexId, $stateParams.studentId, $stateParams.parentId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>Il genitore selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkTeacher = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setTeacher($stateParams.schoolId, $stateParams.complexId, $stateParams.teacherId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>L\'insegnante selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkTeaching = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setTeaching($stateParams.schoolId, $stateParams.complexId, $stateParams.academicYearId, $stateParams.schoolClassId, $stateParams.teachingId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>L\'insegnamento selezionato non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var checkCommunication = ['$q', '$mdToast', '$stateParams', 'Global', function ($q, $mdToast, $stateParams, Global) {
            var deferred = $q.defer();

            Global.setCommunication($stateParams.schoolId, $stateParams.communicationId)
                .then(function () {
                    deferred.resolve();
                }, function () {
                    $mdToast.show({
                        template: '<md-toast>La comunicatione selezionata non esiste o non si hanno le giuste autorizzazioni per accedervi.</md-toast>',
                        hideDelay: 2000
                    });
                    deferred.reject();
                });

            return deferred.promise;
        }];

        var logout = ['$q', '$http', '$location', 'Global', 'SmartState', function ($q, $http, $location, Global, SmartState) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to logout user
            $http.post('logout').success(function () {
                Global.setCurrentUser({});
                deferred.reject();
                SmartState.go('login user');
            });

            return deferred.promise;
        }];

        $httpProvider.interceptors.push(['$q', function ($q) {
            return {
                'response': function (response) {
                    return response || $q.when(response);
                },

                'responseError': function (rejection) {
                    var status = rejection.status;

                    switch (status) {
                        case 401:
                            return $q.reject(rejection);
                        case 404:
                            return $q.reject(rejection);
                    }

                    // otherwise
                    return $q.reject(rejection);
                }
            };
        }]);

        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'views/index.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

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
                url: '/utenti/nuovo',
                templateUrl: 'views/users/form.html',
                resolve: {
                    loggedin: checkLoggedin
                },
                data: {
                    editMode: false
                }
            })

            .state('edit user', {
                url: '/utenti/:userId',
                templateUrl: 'views/users/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    user: checkUser
                },
                data: {
                    editMode: true
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
                templateUrl: 'views/schools/form.html',
                resolve: {
                    loggedin: checkLoggedin
                },
                data: {
                    editMode: false
                }
            })

            .state('edit school', {
                url: '/scuole/:schoolId',
                templateUrl: 'views/schools/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool
                },
                data: {
                    editMode: true
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
                templateUrl: 'views/complexes/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    regions: function (Regions) {
                        return Regions.loadRegions();
                    }
                },
                data: {
                    editMode: false
                }
            })

            .state('edit complex', {
                url: '/scuole/:schoolId/plessi/:complexId',
                templateUrl: 'views/complexes/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    regions: function (Regions) {
                        return Regions.loadRegions();
                    }
                },
                data: {
                    editMode: true
                }
            })

            .state('all academic years', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici',
                templateUrl: 'views/academicYears/list.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex
                }
            })

            .state('create academic year', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/nuovo',
                templateUrl: 'views/academicYears/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex
                },
                data: {
                    editMode: false
                }
            })

            .state('edit academic year', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId',
                templateUrl: 'views/academicYears/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear
                },
                data: {
                    editMode: true
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
                templateUrl: 'views/teachers/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex
                },
                data: {
                    editMode: false
                }
            })

            .state('edit teacher', {
                url: '/scuole/:schoolId/plessi/:complexId/insegnanti/:teacherId',
                templateUrl: 'views/teachers/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    teacher: checkTeacher
                },
                data: {
                    editMode: true
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
                templateUrl: 'views/students/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex
                },
                data: {
                    editMode: false
                }
            })

            .state('edit student', {
                url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId',
                templateUrl: 'views/students/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    student: checkStudent
                },
                data: {
                    editMode: true
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
                templateUrl: 'views/parents/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    student: checkStudent
                },
                data: {
                    editMode: false
                }
            })

            .state('edit parent', {
                url: '/scuole/:schoolId/plessi/:complexId/alunni/:studentId/genitori/:parentId',
                templateUrl: 'views/parents/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    student: checkStudent,
                    parent: checkParent
                },
                data: {
                    editMode: true
                }
            })

            .state('all school classes', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi',
                templateUrl: 'views/schoolClasses/list.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear
                }
            })

            .state('create school class', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/crea',
                templateUrl: 'views/schoolClasses/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear
                },
                data: {
                    editMode: false
                }
            })

            .state('edit school class', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId',
                templateUrl: 'views/schoolClasses/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass
                },
                data: {
                    editMode: true
                }
            })

            .state('all class students', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/alunni',
                templateUrl: 'views/classStudents/list.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass
                }
            })

            .state('student stats', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/alunni/:studentId',
                templateUrl: 'views/classStudents/stats.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass,
                    student: checkStudent
                }
            })

            .state('all teachings', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/insegnamenti',
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
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/insegnamenti/crea',
                templateUrl: 'views/teachings/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass
                },
                data: {
                    editMode: false
                }
            })

            .state('edit teaching', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/insegnamenti/:teachingId',
                templateUrl: 'views/teachings/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass,
                    teaching: checkTeaching
                },
                data: {
                    editMode: true
                }
            })

            .state('class registry by date', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/registri-di-classe/:date',
                templateUrl: 'views/classRegistry/registry.html',
                controller: 'ClassRegistryCtrl',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass
                }
            })

            .state('teaching registry by date', {
                url: '/scuole/:schoolId/plessi/:complexId/anni-scolastici/:academicYearId/classi/:schoolClassId/insegnamenti/:teachingId/registri-personali/:date',
                templateUrl: 'views/teachingRegistry/registry.html',
                controller: 'TeachingRegistryCtrl',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    complex: checkComplex,
                    academicYear: checkAcademicYear,
                    schoolClass: checkSchoolClass,
                    teaching: checkTeaching
                }
            })

            .state('all communications', {
                url: '/scuole/:schoolId/comunicazioni',
                templateUrl: 'views/communications/list.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool
                }
            })

            .state('create communication', {
                url: '/scuole/:schoolId/comunicazioni/nuovo',
                templateUrl: 'views/communications/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool
                },
                data: {
                    editMode: false
                }
            })

            .state('edit communication', {
                url: '/scuole/:schoolId/comunicazioni/:communicationId/modifica',
                templateUrl: 'views/communications/form.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    communication: checkCommunication
                },
                data: {
                    editMode: true
                }
            })

            .state('communication by id', {
                url: '/scuole/:schoolId/comunicazioni/:communicationId',
                templateUrl: 'views/communications/view.html',
                resolve: {
                    loggedin: checkLoggedin,
                    school: checkSchool,
                    communication: checkCommunication
                },
                data: {
                    editMode: true
                }
            });
    });

//Setting HTML5 Location Mode
angular.module('aurea')
    .config(function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    });

//Setting Angular Material Theme
angular.module('aurea')
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
        .accentPalette('pink');
});

//Setting Lodash
angular.module('aurea')
    .factory('_', function () {
        return window._;
    });
