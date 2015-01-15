'use strict';

angular.module('aurea.system')
    .controller('IndexCtrl', function ($scope, SmartState, Global) {
        $scope.global = Global;

        switch (Global.user.role) {
            case 'admin':
                SmartState.go('all schools');
                break;
            case 'manager':
                SmartState.go('all complexes', { schoolId: Global.user.school });
                break;
            default:
                SmartState.go('all academic years', { schoolId: Global.user.school, complexId: Global.user.complex });
        }
    });