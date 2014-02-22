//Teachers service used for teachers REST endpoint
angular.module('aurea.teacher')
  .factory("Teacher", ['$resource',
    function ($resource) {
      return $resource('teacher/:teacherId', {
        teacherId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
