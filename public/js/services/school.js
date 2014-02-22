//Schools service used for schools REST endpoint
angular.module('aurea.school')
  .factory("School", ['$resource',
    function ($resource) {
      return $resource('school/:schoolId', {
        schoolId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
