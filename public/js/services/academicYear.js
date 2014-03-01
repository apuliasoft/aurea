//Schools service used for academic years REST endpoint
angular.module('aurea.academicYear')
  .factory("AcademicYear", ['$resource',
    function ($resource) {
      return $resource('academicYear/:academicYearId', {
        academicYearId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
