'use strict';

//Province service used to serve provinces
angular.module('aurea').factory('Provinces', ['$http', '$q', function($http, $q) {
    var provinces;

    return {
        loadProvinces: function () {
            var deferred = $q.defer();

            if(!provinces) {
                // load provinces with AJAX
                $http.get('/res/provinces.json')
                    .success(function (data) {
                        provinces = data;
                        deferred.resolve(data);
                    }).error(function (err) {
                        console.error(err);
                        deferred.reject();
                    });
            } else {
                deferred.resolve(provinces);
            }

            return deferred.promise;
        },

        getProvinces: function () {
            return provinces;
        }
    };
}]);

