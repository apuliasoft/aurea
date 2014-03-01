//Schools service used for school classes REST endpoint
angular.module('aurea.schoolClass')
  .factory("SchoolClass", ['$resource',
    function ($resource) {
      return $resource('schoolClass/:schoolClassId', {
        schoolClassId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
