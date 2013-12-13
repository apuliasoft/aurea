//Students service used for students REST endpoint
angular.module('aurea.students')
  .factory("Students", ['$resource',
    function ($resource) {
      return $resource('student/:studentId', {
        studentId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
