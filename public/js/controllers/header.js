'use strict';

angular.module('aurea.system')
    .controller('HeaderCtrl', function ($scope, $rootScope, $filter, $stateParams, $mdBottomSheet, $mdDialog, $mdToast, SmartState, Global, Feedback) {
        $scope.global = Global;
        $scope.menu = [];

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            var rules = toState.url.split('/').splice(1);
            $scope.menu.length = 0;
            for (var i = 0; i < rules.length; i += 2) {
                var template = menuTemplate[rules[i]];
                if (!template) {
                    if(rules[i] && rules[i] !== 'login') {
                        console.error('Non esiste un template per ' + rules[i]);
                    }
                    continue;
                }

                var param = rules[i + 1];
                if (param && param.indexOf(':') === 0) {
                    $scope.menu.push({
                        label: template.singular,
                        value: template.valueFn(),
                        submenu: template.submenu
                    });
                } else {
                    $scope.menu.push({
                        value: template.plural
                    });
                }
            }
        });

        $scope.getFeedback = function (event) {
            var feedback = new Feedback({rating: 3});

            $mdDialog.show({
                controller: 'FeedbackCtrl',
                templateUrl: 'views/feedbackDialog.html',
                targetEvent: event,
                locals: {feedback: feedback}
            })
                .then(function (feedback) {
                    if (feedback) {
                        feedback.$save(function () {
                            $mdToast.show({
                                template: '<md-toast>Feedback inviato</md-toast>',
                                hideDelay: 2000
                            });
                        });
                    }
                });
        };

        $scope.logout = function () {
            SmartState.go('logout user');
        };

        $scope.goToListCommunications = function () {
            SmartState.go('all communications');
        };

        $scope.goToViewUser = function () {
            SmartState.go('user by id', {userId: Global.user._id});
        };

        $scope.showListBottomSheet = function (menuitem, $event) {
            var submenu = menuitem.submenu;
            var label = menuitem.label + ' \'' + menuitem.value + '\'';

            if (!submenu) {
                return;
            }

            $mdBottomSheet.show({
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl',
                targetEvent: $event,
                locals: {
                    label: label,
                    submenu: submenu
                }
            }).then(function (submenuItem) {
                SmartState.go(submenuItem.state);
            });
        };

//$scope.goToAcademicYear = function (academicYear) {
//    SmartState.go('all school classes', {
//        schoolId: $stateParams.schoolId,
//        complexId: $stateParams.complexId,
//        academicYearId: academicYear._id
//    });
//};
//
//$scope.goToComplex = function (complex) {
//    SmartState.go('all academic years', {
//        schoolId: $stateParams.schoolId,
//        complexId: complex._id
//    });
//};
//
//$scope.goToSchool = function (school) {
//    SmartState.go('all complexes', {
//        schoolId: school._id
//    });
//};
//
//$scope.goToStudent = function (student) {
//    SmartState.go('all parents', {
//        schoolId: $stateParams.schoolId,
//        complexId: $stateParams.complexId,
//        studentId: student._id
//    });
//};
//
//$scope.goToSchoolClass = function (schoolClass) {
//    SmartState.go('class registry by date', {
//        schoolClassId: schoolClass._id
//    });
//};
//
//$scope.goToTeaching = function (teaching) {
//    SmartState.go('teaching registry by date', {
//        teachingId: teaching._id
//    });
//};

        var menuTemplate = {
            'utenti': {
                plural: 'Utenti',
                singular: 'Utente',
                valueFn: function () {
                    return Global.getUser().name;
                },
                submenu: [
                    {
                        label: 'Lista utenti',
                        icon: 'user',
                        state: 'all users'
                    }
                ]
            },
            'scuole': {
                plural: 'Istituti',
                singular: 'Istituto',
                valueFn: function () {
                    return Global.getSchool().name;
                },
                submenu: [
                    {
                        label: 'Lista scuole',
                        icon: 'university',
                        state: 'all schools'
                    },
                    {
                        label: 'Lista plessi',
                        icon: 'building',
                        state: 'all complexes'
                    },
                    {
                        label: 'Lista comunicazioni',
                        icon: 'bullhorn',
                        state: 'all communications'
                    }
                ]
            },
            'plessi': {
                plural: 'Plessi',
                singular: 'Plesso',
                valueFn: function () {
                    return Global.getComplex().name;
                },
                submenu: [
                    {
                        label: 'Lista plessi',
                        icon: 'building',
                        state: 'all complexes'
                    },
                    {
                        label: 'Lista anni scolastici',
                        icon: 'calendar',
                        state: 'all academic years'
                    },
                    {
                        label: 'Lista insegnanti',
                        icon: 'briefcase',
                        state: 'all teachers'
                    },
                    {
                        label: 'Lista studenti',
                        icon: 'graduation-cap',
                        state: 'all students'
                    }
                ]
            },
            'insegnanti': {
                plural: 'Insegnanti',
                singular: 'Insegnante',
                valueFn: function () {
                    return $filter('name')(Global.getTeacher());
                },
                submenu: [
                    {
                        label: 'Lista insegnanti',
                        icon: 'briefcase',
                        state: 'all teachers'
                    },
                ]
            },
            'alunni': {
                plural: 'Studenti',
                singular: 'Studente',
                valueFn: function () {
                    return $filter('name')(Global.getStudent());
                },
                submenu: [
                    {
                        label: 'Lista studenti',
                        icon: 'graduation-cap',
                        state: 'all students'
                    },
                    {
                        label: 'Lista genitori',
                        icon: 'home',
                        state: 'all parents'
                    }
                ]
            },
            'genitori': {
                plural: 'Genitori',
                singular: 'Genitore',
                valueFn: function () {
                    return $filter('name')(Global.getParent());
                },
                submenu: [
                    {
                        label: 'Lista genitori',
                        icon: 'home',
                        state: 'all parents'
                    }
                ]
            },
            'anni-scolastici': {
                plural: 'Anni scolastici',
                singular: 'Anno scolastico',
                valueFn: function () {
                    return Global.getAcademicYear().name;
                },
                submenu: [
                    {
                        label: 'Lista anni scolastici',
                        icon: 'calendar',
                        state: 'all academic years'
                    },
                    {
                        label: 'Lista classi',
                        icon: 'users',
                        state: 'all classes'
                    }
                ]
            },
            'classi': {
                plural: 'Classi',
                singular: 'Classe',
                valueFn: function () {
                    return Global.getSchoolClass().name;
                },
                submenu: [
                    {
                        label: 'Lista classi',
                        icon: 'users',
                        state: 'all classes'
                    },
                    {
                        label: 'Registro di classe',
                        icon: 'book',
                        state: 'class registry by date'
                    },
                    {
                        label: 'Lista alunni della classe',
                        icon: 'graduation-cap',
                        state: 'all class students'
                    },
                    {
                        label: 'Lista insegnamenti',
                        icon: 'file-text',
                        state: 'all teachings'
                    }
                ]
            },
            'registri-di-classe': {
                plural: 'Registro di classe',
                singular: 'Registro di classe',
                valueFn: function () {
                    return Global.getSchoolClass().name;
                },
                submenu: [
                    {
                        label: 'Registro di classe',
                        icon: 'book',
                        state: 'class registry by date'
                    }
                ]
            },
            'insegnamenti': {
                plural: 'Insegnamenti',
                singular: 'Insegnamento',
                valueFn: function () {
                    return Global.getTeaching().name;
                },
                submenu: [
                    {
                        label: 'Lista insegnamenti',
                        icon: 'file-text',
                        state: 'all teachings'
                    },
                    {
                        label: 'Registro personale',
                        icon: 'book',
                        state: 'teaching registry by date'
                    }
                ]
            },
            'registri-personali': {
                plural: 'Registri personali',
                singular: 'Registro personale',
                valueFn: function () {
                    return Global.getTeaching().name + ' (' + Global.getSchoolClass().name + ')';
                },
                submenu: [
                    {
                        label: 'Registro personale',
                        icon: 'book',
                        state: 'teaching registry by date'
                    }
                ]
            },
            'comunicazioni': {
                plural: 'Comunicazioni',
                singular: 'Comunicazione',
                valueFn: function () {
                    return Global.getCommunication().title;
                },
                submenu: [
                    {
                        label: 'Lista comunicazioni',
                        icon: 'bullhorn',
                        state: 'all communications'
                    }
                ]
            }
        };

        //var MenuCtrl = ['$scope', '$mdBottomSheet', function ($scope, $mdBottomSheet, label, submenu) {
        //    $scope.label = label;
        //    $scope.submenu = submenu;
        //
        //    $scope.itemClick = function (submenuItem) {
        //        $mdBottomSheet.hide(submenuItem);
        //    };
        //}];

        //var FeedbackCtrl = ['$scope', '$mdDialog', function ($scope, $mdDialog, feedback) {
        //
        //    $scope.feedback = feedback;
        //
        //    $scope.cancel = function () {
        //        $mdDialog.cancel();
        //    };
        //
        //    $scope.save = function (isValid) {
        //        if (isValid) {
        //            $mdDialog.hide($scope.feedback);
        //        }
        //    };
        //}];
    })
  .controller('MenuCtrl', function ($scope, $mdBottomSheet, label, submenu) {
      $scope.label = label;
      $scope.submenu = submenu;

      $scope.itemClick = function (submenuItem) {
          $mdBottomSheet.hide(submenuItem);
      };
  })
  .controller('FeedbackCtrl', function ($scope, $mdDialog, feedback) {

      $scope.feedback = feedback;

      $scope.cancel = function () {
          $mdDialog.cancel();
      };

      $scope.save = function (isValid) {
          if (isValid) {
              $mdDialog.hide($scope.feedback);
          }
      };
  })
;
