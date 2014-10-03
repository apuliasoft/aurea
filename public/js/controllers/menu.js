'use strict';

angular.module('aurea.system').controller('MenuCtrl', ['$scope', '$filter', '_', 'Global', '$state', 'SmartState', function ($scope, $filter, _, Global, $state, SmartState) {
    $scope.global = Global;

    $scope.isVisible = function (menuItem) {
        if (!Global.isLoggedin()) return false;

        if (menuItem.contexts && !_.reduce(menuItem.contexts, function (memo, context) {
            return memo && context();
        }, true)) {
            return false;
        }

        if (menuItem.roles && !_.reduce(menuItem.roles, function (memo, role) {
            return memo || role();
        }, false)) {
            return false;
        }

        return true;
    };

    function hasSchoolContext() {
        return Global.user.school || Global.getSchool();
    }

    function hasComplexContext() {
        return Global.user.complex || Global.getComplex();
    }

    $scope.menu = [
        {
            icon: 'building-o',
            title: 'Scuole',
            goToState: function () {
                SmartState.go('all schools');
            },
            isActive: function () {
                return $state.current.name === 'all schools';
            },
            roles: [Global.isAdmin]
        },
        {
            icon: 'building-o',
            title: 'Plessi',
            goToState: function () {
                SmartState.go('all complexes');
            },
            isActive: function () {
                return $state.current.name === 'all complexes';
            },
            roles: [Global.isAdmin, Global.isManager],
            contexts: [Global.getSchool]
        },
        {
            icon: 'bullhorn',
            title: 'Comunicazioni',
            goToState: function () {
                SmartState.go('all communications');
            },
            isActive: function () {
                return $state.current.name === 'all communications';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isStudent, Global.isParent],
            contexts: [Global.getSchool]
        },
        {
            icon: 'graduation-cap',
            title: 'Insegnanti',
            goToState: function () {
                SmartState.go('all teachers');
            },
            isActive: function () {
                return $state.current.name === 'all teachers';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex]
        },
        {
            icon: 'child',
            title: 'Alunni',
            goToState: function () {
                SmartState.go('all students');
            },
            isActive: function () {
                return $state.current.name === 'all students';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex]
        },
        {
            //FIXME fare quello che si e' fatto per gli anni accademici anche per tutti gli altri bottoni nel menu
            icon: 'calendar',
            title: 'Anni accademici',
            goToState: function () {
                SmartState.go('all academic years');
            },
            isActive: function () {
                return $state.current.name === 'all academic years';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [hasSchoolContext, hasComplexContext]
        },
        {
            icon: 'male',
            title: 'Genitori',
            goToState: function () {
                SmartState.go('all parents');
            },
            isActive: function () {
                return $state.current.name === 'all parents';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getStudent]
        },
        {
            icon: 'home',
            title: 'Classi',
            goToState: function () {
                SmartState.go('all school classes');
            },
            isActive: function () {
                return $state.current.name === 'all school classes';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear]
        },
        {
            icon: 'pencil',
            title: 'Insegnamenti',
            goToState: function () {
                SmartState.go('all teachings');
            },
            isActive: function () {
                return $state.current.name === 'all teachings';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear, Global.getSchoolClass]
        },
        {
            icon: 'book',
            title: 'Registro di Classe',
            goToState: function () {
                SmartState.go('class registry by date', {
                    date: $filter('date')(new Date(), 'yyyy-MM-dd')
                });
            },
            isActive: function () {
                return $state.current.name === 'class registry by date';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear, Global.getSchoolClass]
        },
        {
            icon: 'book',
            title: 'Registro Personale',
            goToState: function () {
                SmartState.go('teaching registry by date', {
                    date: $filter('date')(new Date(), 'yyyy-MM-dd')
                });
            },
            isActive: function () {
                return $state.current.name === 'teaching registry by date';
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear, Global.getSchoolClass, Global.getTeaching]
        },
        {
            icon: 'users',
            title: 'Utenti',
            goToState: function () {
                SmartState.go('all users');
            },
            isActive: function () {
                return $state.current.name === 'all users';
            },
            roles: [Global.isAdmin]
        }
    ];

}]);
