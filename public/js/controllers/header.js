'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', function ($scope, Global, $filter) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Utenti',
        'link': 'utenti'
    }, {
        'title': 'Scuole',
        'link': 'scuole'
    }, {
        'title': 'Insegnanti',
        'link': 'insegnanti'
    }, {
        'title': 'Alunni',
        'link': 'alunni'
    }, {
        'title': 'Anni accademici',
        'link': 'aa'
    }, {
        'title': 'Classi',
        'link': 'classi'
    }, {
        'title': 'Insegnamenti',
        'link': 'insegnamenti'
    }, {
        'title': 'Quadri Orari',
        'link': 'quadriOrari'
    },{
        'title': 'Registro di Classe',
        'link': 'registroDiClasse/' + $filter('date')(new Date(), 'd-M-yyyy')
    }];
    
    $scope.isCollapsed = false;
}]);