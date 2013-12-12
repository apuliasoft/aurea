//Setting up route
angular.module('aurea')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/scuole', {
          templateUrl: 'views/schools/list.html'
        }).
        when('/scuole/crea', {
          templateUrl: 'views/schools/create.html'
        }).
        when('/scuole/:schoolId/modifica', {
          templateUrl: 'views/schools/edit.html'
        }).
        when('/scuole/:schoolId', {
          templateUrl: 'views/schools/view.html'
        }).
        when('/insegnanti', {
          templateUrl: 'views/teachers/list.html'
        }).
        when('/insegnanti/crea', {
          templateUrl: 'views/teachers/create.html'
        }).
        when('/insegnanti/:teacherId/modifica', {
          templateUrl: 'views/teachers/edit.html'
        }).
        when('/insegnanti/:teacherId', {
          templateUrl: 'views/teachers/view.html'
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