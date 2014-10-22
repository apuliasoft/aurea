'use strict';

angular.module('aurea')
    .directive('asConfirmedClick', function ($window) {
        return {
            restrict: 'A',
            scope: {
                confirmMessage: '@asConfirmMessage',
                click: '&asConfirmedClick'
            },
            link: function (scope, element) {
                element.bind('click', function () {
                    if($window.confirm(scope.confirmMessage)) {
                        scope.$eval(scope.click);
                    }
                });
            }
        };
    });