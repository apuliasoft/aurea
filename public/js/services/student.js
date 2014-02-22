//Students service used for students REST endpoint
angular.module('aurea.student')
  .factory("Student", ['$resource',
    function ($resource) {
      return $resource('student/:studentId', {
        studentId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);
