'use strict';

//Province service used to serve provinces
angular.module('aurea').factory('TimeTable', ['$http', '$q', function ($http, $q) {
    var timeTables = {};

    return {
        loadTimeTable: function (academicYearId) {
            var deferred = $q.defer();

            if (!timeTable[academicYearId]) {
                // load time table with AJAX
                $http.get('/academicYears/getTimeTable', { academicYearId: academicYearId })
                    .success(function (data) {
                        timeTables[academicYearId] = data;
                        deferred.resolve(data);
                    }).error(function (err) {
                        console.error(err);
                        deferred.reject();
                    });
            } else {
                deferred.resolve(timeTables[academicYearId]);
            }

            return deferred.promise;
        },

        getTimeTable: function (academicYearId) {
            return timeTables[academicYearId];
        }
    };
}]);