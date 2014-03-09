'use strict';

//Data table directive used for print a datatable
angular.module('aurea').directive('datatable', ['$filter', function($filter) {
    return {
        templateUrl: 'views/directives/datatable.html',

        restrict: 'E',

        replace: true,

        scope: {
            columns: '=',
            list: '=',
            view: '&',
            edit: '&',
            remove: '&'
        },

        link: function postLink(scope) {

            scope.getLabel = function(column) {
                if(column.label) {
                    return column.label;
                } else {
                    return $filter('capitalize')(column.name);
                }
            };

            scope.getData = function(element, column) {
                var value = element[column.name];
                if(column.filter) {
                    value = $filter(column.filter)(value);
                }
                return value;
            };
        }
    };
}]);