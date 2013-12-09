//Schools service used for schools REST endpoint
angular.module('aurea.schools')
  .factory("Schools", ['$resource',
    function ($resource) {
      return $resource('school/:schoolId', {
        schoolId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
