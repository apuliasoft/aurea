'use strict';

angular.module('aurea.complexes')
    .controller('ComplexesCtrl', function ($scope, $stateParams, $mdToast, SmartState, _, Provinces, Global, Complex) {
        $scope.global = Global;
        $scope.provinces = Provinces.getProvinces();

        $scope.goToListComplexes = function () {
            SmartState.go('all complexes');
        };

        $scope.goToCreateComplex = function () {
            SmartState.go('create complex');
        };

        $scope.goToEditComplex = function (complex) {
            SmartState.go('edit complex', { complexId: complex._id });
        };

        $scope.goToListAcademicYears = function (complex) {
            SmartState.go('all academic years', { complexId: complex._id });
        };

        $scope.init = function () {
            $scope.complex = new Complex({
                school: Global.getSchool()._id
            });
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var complex = $scope.complex;
                complex.$save(function () {
                    $scope.goToListComplexes();
                    $mdToast.show({
                      template: '<md-toast>Plesso creato</md-toast>',
                      hideDelay: 2000
                    });
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var complex = $scope.complex;
                if (!complex.updated) {
                    complex.updated = [];
                }
                complex.updated.push(new Date().getTime());

                complex.$update(function () {
                    $scope.goToListComplexes();
                    $mdToast.show({
                      template: '<md-toast>Plesso aggiornato</md-toast>',
                      hideDelay: 2000
                    });
                });
            }
        };

        $scope.remove = function (complex) {
            if (complex) {
                complex.$remove();
                _.remove($scope.complexes, complex);
                $scope.goToListComplexes();
                $mdToast.show({
                  template: '<md-toast>Plesso cancellato</md-toast>',
                  hideDelay: 2000
                });
            }
        };

        $scope.find = function () {
            Complex.query({
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (complexes) {
                    $scope.complexes = complexes;
                });
        };

        $scope.findOne = function () {
            Complex.get({
                schoolId: Global.getSchool()._id,
                complexId: $stateParams.complexId
            }).$promise
                .then(function (complex) {
                    $scope.complex = complex;
                });
        };
    });
