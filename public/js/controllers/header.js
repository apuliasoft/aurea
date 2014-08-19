'use strict';

angular.module('aurea.system').controller('HeaderCtrl', ['$scope', 'Global', '$filter', function ($scope, Global, $filter) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Logout',
        'link': 'logout'
    }, {
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
        'link': 'anni-accademici'
    }, {
        'title': 'Classi',
        'link': 'classi'
    }, {
        'title': 'Insegnamenti',
        'link': 'insegnamenti'
    }, {
        'title': 'Quadri Orari',
        'link': 'quadri-orari'
    },{
        'title': 'Registro di Classe',
        'link': 'registri-di-classe/' + $filter('date')(new Date(), 'd-M-yyyy')
    }];
    
    $scope.isCollapsed = false;
}]);