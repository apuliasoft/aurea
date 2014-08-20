'use strict';

angular.module('aurea.users').controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
        // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function() {
          $http.post('/login', {
              email: $scope.user.email,
              password: $scope.user.password
          })
          .success(function(response) {
            // authentication OK
              $scope.loginError = 0;
              $rootScope.$emit('loggedin');
              if (response.redirect) {
                  if (window.location.href === response.redirect) {
                      //This is so an admin user will get full admin page
                      window.location.reload();
                  } else {
                      window.location = response.redirect;
                  }
              } else {
                  $location.url('/');
              }
          })
          .error(function() {
              $scope.loginerror = 'Autenticazione fallita.';
          });
        };
    }
]);