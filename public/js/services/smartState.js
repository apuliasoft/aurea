'use strict';

//Province service used to serve provinces
angular.module('aurea').factory('SmartState', ['$state', '$stateParams', '_', function ($state, $stateParams, _) {
    return {

        go: function (name, params) {
            params = params || {};

            var nextState = $state.get(name);

            _.filter(nextState.url.split('/'), function (elem) {
                return elem.charAt(0) === ':';
            }).map(function (elem) {
                return elem.substring(1);
            }).forEach(function (elem) {
                if ($stateParams[elem] && !params[elem]) {
                    params[elem] = $stateParams[elem];
                }
            });

            $state.go(name, params)
              .catch(function (err) {
                  console.log(err);
              });
        }

    };
}]);