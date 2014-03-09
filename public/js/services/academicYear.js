'use strict';

//Academic year service used for academic years REST endpoint
angular.module('aurea.academicYears').factory('AcademicYear', ['$resource', function($resource) {
    return $resource('academicYears/:academicYearId', {
        academicYearId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);