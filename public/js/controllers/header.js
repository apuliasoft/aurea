'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', function ($scope, Global) {
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
        'link': 'registroDiClasse'
    }];
    
    $scope.isCollapsed = false;
}]);