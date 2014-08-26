'use strict';

angular.module('aurea.system').controller('MenuCtrl', ['$scope', 'Global', '$filter', 'SmartState', function ($scope, Global, $filter, SmartState) {
    $scope.global = Global;

    $scope.$watch('global.user', function () {
        updateMenu();
    });

    function updateMenu() {
        $scope.menu = [];

        if (!Global.isLoggedin()) return;

        if (Global.isAdmin()) {
            $scope.menu.push({
                'title': 'Utenti',
                'goToState': function () { SmartState.go('all users'); },
                'ngif': Global.isAdmin
            });
        }

        $scope.menu.push({
            'title': 'Scuole',
            'goToState': function () { SmartState.go('all schools'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnanti',
            'goToState': function () { SmartState.go('all teachers'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Alunni',
            'goToState': function () { SmartState.go('all students'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Anni accademici',
            'goToState': function () { SmartState.go('all academic years'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Classi',
            'goToState': function () { SmartState.go('all school classes'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnamenti',
            'goToState': function () { SmartState.go('all teachings'); },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro di Classe',
            'goToState': function () {
                SmartState.go('class registry by date', {
                    date: $filter('date')(new Date(), 'yyyy-MM-dd')
                });
            },
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro Personale',
            'goToState': 'registri-personali/' + $filter('date')(new Date(), 'd-M-yyyy')
        });
    }

    $scope.isCollapsed = false;


}]);
