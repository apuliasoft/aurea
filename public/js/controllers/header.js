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
        'link': 'anni-accademici'
    }, {
        'title': 'Classi',
        'link': 'classi'
    }, {
        'title': 'Insegnamenti',
        'link': 'insegnamenti'
    },{
        'title': 'Registro di Classe',
        'link': 'registri-di-classe/53f1ffd35f8fddfd599e6c9b/' + $filter('date')(new Date(), 'yyyy-MM-dd')
    }];
    
    $scope.isCollapsed = false;
}]);