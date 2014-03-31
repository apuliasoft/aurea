'use strict';

/**
 * Trasforma un numero in formato numerico nel corrispondente
 * numero ordinale in formato di stringa
**/
angular.module('aurea').filter('ordinalNumber', [function() {
    return function (input) {
        var number = 'Numero non valido!';
        switch (input) {
            case 1:
                number = 'Prima';
                break;
            case 2:
                number = 'Seconda';
                break;
            case 3:
                number = 'Terza';
                break;
            case 4:
                number = 'Quarta';
                break;
            case 5:
                number = 'Quinta';
                break;
            case 6:
                number = 'Sesta';
                break;
            case 7:
                number = 'Settima';
                break;
        }
        return number;
    };
}]);