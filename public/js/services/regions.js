'use strict';

//Regions service used to serve regions
angular.module('aurea')
    .factory('Regions', function ($http, $q) {
        var regions;

        return {
            loadRegions: function () {
                var deferred = $q.defer();

                if (!regions) {
                    // load provinces with AJAX
                    $http.get('/res/regions.json')
                        .success(function (data) {
                            regions = data;
                            deferred.resolve(data);
                        }).error(function (err) {
                            console.error(err);
                            deferred.reject();
                        });
                } else {
                    deferred.resolve(regions);
                }

                return deferred.promise;
            },

            getRegions: function () {
                return regions;
            }
        };
    });

