'use strict';

/**
 * Trasforma un numero in formato numerico nel corrispondente
 * giorno della settimana in formato di stringa
 **/
angular.module('aurea')
    .filter('weekDay', function () {
        return function (input) {
            var day = 'Giorno non valido!';
            switch (input) {
                case 0:
                    day = 'Domenica';
                    break;
                case 1:
                    day = 'Lunedì';
                    break;
                case 2:
                    day = 'Martedì';
                    break;
                case 3:
                    day = 'Mercoledì';
                    break;
                case 4:
                    day = 'Giovedì';
                    break;
                case 5:
                    day = 'Venerdì';
                    break;
                case 6:
                    day = 'Sabato';
                    break;
            }
            return day;
        };
    });