'use strict';

//Province service used to serve provinces
angular.module('aurea').factory('SmartState', ['$state', '$stateParams', '_', 'Global', function ($state, $stateParams, _, Global) {
    return {

        go: function (name, params) {
            var user = Global.getUser();

            // 1. parametri passati come parametro
            params = params || {};

            var nextState = $state.get(name);

            // 2. parametri inferiti dalla URL
            _.filter(nextState.url.split('/'), function (elem) {
                return elem.charAt(0) === ':';
            }).map(function (elem) {
                return elem.substring(1);
            }).forEach(function (elem) {
                if ($stateParams[elem] && !params[elem]) {
                    params[elem] = $stateParams[elem];
                }
            });

            // 3. parametri inferiti dal contesto dell'utente
            if (user.school && !params.schoolId) {
                params.schoolId = user.school;
            }

            if (user.complex && !params.complexId) {
                params.complexId = user.complex;
            }

            //TODO controllate l'opzione 'inherit' del metodo go
            $state.go(name, params)
              .catch(function (err) {
                  console.log(name);
                  console.log(err);
              });
        }

    };
}]);