'use strict';

angular.module('aurea.system').controller('IndexCtrl', ['$scope', 'AcademicYear', 'Global', 'SmartState', function ($scope, AcademicYear, Global, SmartState) {
    $scope.global = Global;

    Global.title = 'Aurea: un registro elettronico aperto';

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
}]);