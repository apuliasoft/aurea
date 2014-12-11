'use strict';

angular.module('aurea.parents')
    .controller('ParentsCtrl', function ($scope, $state, $stateParams, $mdToast, _, SmartState, Global, Parent) {
        $scope.global = Global;

        $scope.goToListParents = function () {
            SmartState.go('all parents');
        };

        $scope.goToCreateParent = function () {
            SmartState.go('create parent');
        };

        $scope.goToEditParent = function (parent) {
            SmartState.go('edit parent', { parentId: parent._id });
        };

        $scope.find = function () {
            Parent.query({
                studentId: Global.getStudent()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (parents) {
                    $scope.parents = parents;
                });
        };

        $scope.init = function () {
            $scope.editMode = $state.current.data.editMode;
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica genitore';
                findOne();
            } else {
                $scope.title = 'Nuovo genitore';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var parent = $scope.parent;
                if ($state.current.data.editMode) {
                    update(parent);
                } else {
                    create(parent);
                }
            }
        };

        $scope.remove = function (parent) {
            if (parent) {
                parent.$remove();
                _.remove($scope.parents, parent);
                $mdToast.show({
                    template: '<md-toast>Genitore cancellato</md-toast>',
                    hideDelay: 2000
                });
            }
        };

        var prepare = function () {
            $scope.parent = new Parent({
                school: Global.getSchool()._id,
                complex: Global.getComplex()._id,
                student: Global.getStudent()._id
            });
        };

        var findOne = function () {
            Parent.get({
                parentId: $stateParams.parentId,
                studentId: Global.getStudent()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (parent) {
                    $scope.parent = parent;
                });
        };

        var create = function (parent) {
            parent.$save(function () {
                $scope.goToListParents();
                $mdToast.show({
                    template: '<md-toast>Genitore creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (parent) {
            if (!parent.updated) {
                parent.updated = [];
            }
            parent.updated.push(new Date().getTime());

            parent.$update(function () {
                $scope.goToListParents();
                $mdToast.show({
                    template: '<md-toast>Genitore aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };
    });