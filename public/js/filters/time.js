'use strict';

/**
 * Trasforma un numero di minuti in formato numerico
 * in un orario in formato di stringa
 **/
angular.module('aurea')
    .filter('time', function () {
        return function (input) {
            var hours = String(Math.floor(input / 60));
            var minutes = String(input % 60);

            if (hours < 10) {
                hours = '0' + hours;
            }

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            return hours + ':' + minutes;
        };
    });