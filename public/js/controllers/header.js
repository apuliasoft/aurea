'use strict';

angular.module('aurea.system')
    .controller('HeaderCtrl', function ($scope, $stateParams, $mdDialog, $mdToast, SmartState, Global, Feedback) {
        $scope.global = Global;

        $scope.getFeedback = function (event) {
            var feedback = new Feedback({ rating: 1, text: '' });

            $mdDialog.show({
                controller: FeedbackCtrl,
                templateUrl: 'views/feedbackDialog.html',
                targetEvent: event,
                locals: { feedback: feedback }
            })
                .then(function (feedback) {
                    if (feedback) {
                        feedback.$save(function () {
                            $mdToast.show({
                                template: '<md-toast>Feedback inviato</md-toast>',
                                hideDelay: 2000
                            });
                        });
                    }
                });
        };

        $scope.logout = function () {
            SmartState.go('logout user');
        };

        $scope.goToListCommunications = function () {
            SmartState.go('all communications');
        };

        $scope.goToViewUser = function () {
            SmartState.go('user by id', {userId: Global.user._id});
        };

        $scope.goToAcademicYear = function (academicYear) {
            SmartState.go('all school classes', {
                schoolId: $stateParams.schoolId,
                complexId: $stateParams.complexId,
                academicYearId: academicYear._id
            });
        };

        $scope.goToComplex = function (complex) {
            SmartState.go('all academic years', {
                schoolId: $stateParams.schoolId,
                complexId: complex._id
            });
        };

        $scope.goToSchool = function (school) {
            SmartState.go('all complexes', {
                schoolId: school._id
            });
        };

        $scope.goToStudent = function (student) {
            SmartState.go('all parents', {
                schoolId: $stateParams.schoolId,
                complexId: $stateParams.complexId,
                studentId: student._id
            });
        };

        $scope.goToSchoolClass = function (schoolClass) {
            SmartState.go('class registry by date', {
                schoolClassId: schoolClass._id
            });
        };

        $scope.goToTeaching = function (teaching) {
            SmartState.go('teaching registry by date', {
                teachingId: teaching._id
            });
        };

        var FeedbackCtrl = function ($scope, $mdDialog, feedback) {

            $scope.feedback = feedback;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function (isValid) {
                if (isValid) {
                    $mdDialog.hide($scope.feedback);
                }
            };
        };
    });
