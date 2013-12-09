//Setting up route
angular.module('aurea')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/articles', {
          templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
          templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
          templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
          templateUrl: 'views/articles/view.html'
        }).
        when('/schools', {
          templateUrl: 'views/schools/list.html'
        }).
        when('/schools/create', {
          templateUrl: 'views/schools/create.html'
        }).
        when('/schools/:schoolId/edit', {
          templateUrl: 'views/schools/edit.html'
        }).
        when('/schools/:schoolId', {
          templateUrl: 'views/schools/view.html'
        }).
        when('/', {
          templateUrl: 'views/index.html'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
  ]);

//Setting HTML5 Location Mode
angular.module('aurea')
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix("!");
    }
  ]);