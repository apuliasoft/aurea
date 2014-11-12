'use strict';

angular.module('aurea.complexes')
    .controller('ComplexesCtrl', function ($scope, $state, $stateParams, $mdToast, SmartState, _, Provinces, Global, Complex) {
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

        $scope.find = function () {
            Complex.query({
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (complexes) {
                    $scope.complexes = complexes;
                });
        };

        $scope.init = function () {
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica plesso';
                findOne();
            } else {
                $scope.title = 'Nuovo plesso';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var complex = $scope.complex;
                if ($state.current.data.editMode) {
                    update(complex);
                } else {
                    create(complex);
                }
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

        var prepare = function () {
            $scope.complex = new Complex({
                school: Global.getSchool()._id
            });
        };

        var findOne = function () {
            Complex.get({
                schoolId: Global.getSchool()._id,
                complexId: $stateParams.complexId
            }).$promise
                .then(function (complex) {
                    $scope.complex = complex;
                });
        };

        var create = function (complex) {
            complex.$save(function () {
                $scope.goToListComplexes();
                $mdToast.show({
                    template: '<md-toast>Plesso creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (complex) {
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
        };
    });
