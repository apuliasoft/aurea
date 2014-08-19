'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', '$rootScope', 'Global', '$filter', function ($scope, $rootScope, Global, $filter) {
    $scope.global = Global;

    $scope.$watch('global.user', function(){
        updateMenu();
    });

    function updateMenu() {
        $scope.menu = [];

        if (!Global.isLoggedin()) return;

        if (Global.isAdmin()) {
            $scope.menu.push({
                'title': 'Utenti',
                'link': 'utenti',
                'ngif': Global.isAdmin
            });
        }

        $scope.menu.push({
            'title': 'Scuole',
            'link': 'scuole',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnanti',
            'link': 'insegnanti',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Alunni',
            'link': 'alunni',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Anni accademici',
            'link': 'anni-accademici',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Classi',
            'link': 'classi',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Insegnamenti',
            'link': 'insegnamenti',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Quadri Orari',
            'link': 'quadri-orari',
            'ngif': Global.isAdmin
        });

        $scope.menu.push({
            'title': 'Registro di Classe',
            'link': 'registri-di-classe/' + $filter('date')(new Date(), 'd-M-yyyy'),
            'ngif': Global.isAdmin
        });
    }

    
    $scope.isCollapsed = false;
}]);