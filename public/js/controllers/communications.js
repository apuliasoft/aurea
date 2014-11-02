'use strict';

angular.module('aurea.communications')
    .controller('CommunicationsCtrl', function ($scope, $stateParams, SmartState, _, Global, Communication) {
        $scope.global = Global;

        $scope.goToListCommunications = function () {
            SmartState.go('all communications');
        };

        $scope.goToCreateCommunication = function () {
            SmartState.go('create communication');
        };

        $scope.goToEditCommunication = function (communication) {
            SmartState.go('edit communication', { communicationId: communication._id });
        };

        $scope.goToViewCommunication = function (communication) {
            SmartState.go('communication by id', { communicationId: communication._id });
        };

        $scope.init = function () {
            $scope.communication = new Communication({
                school: Global.getSchool()._id
            });
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var communication = $scope.communication;
                communication.pubDate = new Date();
                communication.$save(function () {
                    $scope.goToListCommunications();
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var communication = $scope.communication;
                if (!communication.updated) {
                    communication.updated = [];
                }
                communication.updated.push(new Date().getTime());

                communication.$update(function () {
                    $scope.goToListCommunications();
                });
            }
        };

        $scope.find = function () {
            Communication.query({
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (communications) {
                    $scope.communications = communications;
                });
        };

        $scope.findOne = function () {
            Communication.get({
                schoolId: Global.getSchool()._id,
                communicationId: $stateParams.communicationId
            }).$promise
                .then(function (communication) {
                    $scope.communication = communication;
                });
        };

        $scope.remove = function () {
            var communication = $scope.communication;
            communication.$delete(function () {
                $scope.goToListCommunications();
            });
        };
    });

































