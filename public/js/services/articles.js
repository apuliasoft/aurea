//Articles service used for articles REST endpoint
angular.module('aurea.articles')
  .factory("Articles", ['$resource',
    function ($resource) {
      return $resource('articles/:articleId', {
        articleId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }]);