'use strict';

angular.module('aurea.system').controller('MenuCtrl', ['$scope', '$filter', '_', 'Global', 'SmartState', function ($scope, $filter, _, Global, SmartState) {
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


    $scope.menu = [
        {
            icon: 'building-o',
            title: 'Scuole',
            goToState: function () {
                SmartState.go('all schools');
            },
            roles: [Global.isAdmin]
        },
        {
            icon: 'building-o',
            title: 'Plessi',
            goToState: function () {
                SmartState.go('all complexes');
            },
            roles: [Global.isAdmin, Global.isManager],
            contexts: [Global.getSchool]
        },
        {
            icon: 'graduation-cap',
            title: 'Insegnanti',
            goToState: function () {
                SmartState.go('all teachers');
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
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex]
        },
        {
            icon: 'calendar',
            title: 'Anni accademici',
            goToState: function () {
                SmartState.go('all academic years');
            },
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex]
        },
        {
            icon: '',
            title: 'Genitori',
            goToState: function () {
                SmartState.go('all parents');
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
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear]
        },
        {
            icon: 'pencil',
            title: 'Insegnamenti',
            goToState: function () {
                SmartState.go('all teachings');
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
            roles: [Global.isAdmin, Global.isManager, Global.isTeacher, Global.isParent, Global.isStudent],
            contexts: [Global.getSchool, Global.getComplex, Global.getAcademicYear, Global.getSchoolClass, Global.getTeaching]
        },
        {
            icon: 'users',
            title: 'Utenti',
            goToState: function () {
                SmartState.go('all users');
            },
            roles: [Global.isAdmin]
        }
    ];

}]);
