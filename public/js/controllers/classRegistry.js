'use strict';

angular.module('aurea.classRegistry')
    .controller('ClassRegistryCtrl', function ($scope, $location, $stateParams, $filter, $mdDialog, $mdSidenav, $mdToast, _, SmartState, Global, ClassRegistry, ClassStudent, Teacher, Teaching) {

        $scope.$watch('classRegistry.date', function () {
            if ($scope.classRegistry) {
                var day = new Date($scope.classRegistry.date);
                SmartState.go('class registry by date', {
                    date: $filter('date')(day, 'yyyy-MM-dd')
                });
            }
        });

        $scope.goPrevDay = function () {
            var day = new Date($stateParams.date);
            var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
            var found = false;
            while (!found) {
                if (_.contains($scope.weekdays, newDay.getDay())) {
                    SmartState.go('class registry by date', {
                        date: $filter('date')(newDay, 'yyyy-MM-dd')
                    });
                    found = true;
                } else {
                    newDay = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate() - 1);
                }
            }
        };

        $scope.goNextDay = function () {
            var day = new Date($stateParams.date);
            var newDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
            var found = false;
            while (!found) {
                if (_.contains($scope.weekdays, newDay.getDay())) {
                    SmartState.go('class registry by date', {
                        date: $filter('date')(newDay, 'yyyy-MM-dd')
                    });
                    found = true;
                } else {
                    newDay = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate() + 1);
                }
            }
        };

        $scope.init = function () {
            var date = new Date($stateParams.date);

            // Carico gli insegnanti del plesso
            $scope.teachers = Teacher.query({
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id
            });

            // Carico gli studenti della classe
            $scope.classStudents = ClassStudent.query({
                schoolClassId: Global.getSchoolClass()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id,
                academicYearId: Global.getAcademicYear()._id
            });

            // Carico gli insegnamenti della classe
            $scope.teachings = Teaching.query({
                schoolId: Global.getSchool()._id,
                complexId: Global.getComplex()._id,
                academicYearId: Global.getAcademicYear()._id,
                schoolClassId: Global.getSchoolClass()._id
            });

            ClassRegistry.get({
                date: date.toISOString(),
                schoolClassId: Global.getSchoolClass()._id,
                academicYearId: Global.getAcademicYear()._id,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (classRegistry) {
                    $scope.classRegistry = deserializeData(classRegistry);
                });

            $scope.minDate = new Date(Global.getAcademicYear().startDate);

            $scope.maxDate = new Date(Global.getAcademicYear().endDate);

            $scope.selectedStudents = [];

            $scope.weekdays = _(Global.getAcademicYear().timeTable).
                filter(function (slot) {
                    return slot.slots.length > 0;
                })
                .map(function (item) {
                    return item.weekDay === 7 ? 0 : item.weekDay;
                })
                .value();

            $scope.timeslots = _.find(Global.getAcademicYear().timeTable, function (day) {
                return day.weekDay === date.getDay();
            });

            var prevDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            var nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

            $scope.prevDisabled = prevDate < new Date($scope.minDate.setHours(0, 0, 0, 0));
            $scope.nextDisabled = nextDate > new Date($scope.maxDate.setHours(0, 0, 0, 0));

        };

        $scope.save = function () {
            var classRegistry = $scope.classRegistry;
            classRegistry = serializeData(classRegistry);

            if (!classRegistry.updated) {
                classRegistry.updated = [];
            }
            classRegistry.updated.push(new Date().getTime());

            classRegistry._date = classRegistry.date;

            classRegistry.$update(function () {
                classRegistry = deserializeData(classRegistry);

                $mdToast.show({
                    template: '<md-toast>Registro aggiornato.</md-toast>',
                    hideDelay: 2000
                });
            });
        };

//        // UTILITY FUNCTIONS
//
//        $scope.dateOptions = {
//            startingDay: 1,
//            showWeeks: false,
//            datepickerMode: 'day'
//        };
//
//        $scope.open = function ($event) {
//            $event.preventDefault();
//            $event.stopPropagation();
//            $scope.opened = true;
//        };
//
//        // Disabilita i giorni per cui non c'è la timetable
//        $scope.disabled = function (date, mode) {
//            return ( mode === 'day' && !_.contains($scope.weekdays, date.getDay()));
//        };

        $scope.clearSelection = function () {
            _.map($scope.classStudents, function (classStudent) {
                classStudent.selected = false;
            });
        };

        $scope.noneSelected = function () {
            var selectedStudents = _.chain($scope.classStudents)
                .filter(function (classStudent) {
                    return classStudent.selected;
                })
                .map(function (selectedStudent) {
                    return selectedStudent._id;
                })
                .value();

            return selectedStudents.length === 0;
        };

        $scope.isValidEntranceSelection = function () {
            var selectedStudents = _.chain($scope.classStudents)
                .filter(function (classStudent) {
                    return classStudent.selected;
                })
                .map(function (selectedStudent) {
                    return selectedStudent._id;
                })
                .value();

            return selectedStudents.length === 1;
        };

        $scope.isValidLeaveSelection = function () {
            var selectedStudents = _.chain($scope.classStudents)
                .filter(function (classStudent) {
                    return classStudent.selected;
                })
                .map(function (selectedStudent) {
                    return selectedStudent._id;
                })
                .value();

            return selectedStudents.length === 1;
        };

        $scope.toggleAbsents = function () {
            var selectedStudents = _.chain($scope.classStudents)
                .filter(function (classStudent) {
                    return classStudent.selected;
                })
                .map(function (selectedStudent) {
                    return selectedStudent._id;
                })
                .value();

            $scope.classRegistry.absences = _.xor($scope.classRegistry.absences, selectedStudents);

            $scope.clearSelection();
        };

        $scope.addLateEntrance = function (event) {

            var student = _.find($scope.classStudents, function (student) {
                return student.selected;
            });

            var lateEntrance = _.find($scope.classRegistry.lateEntrances, function (lateEntrance) {
                return lateEntrance.student === student._id;
            });

            $mdDialog.show({
                controller: TimeDialogCtrl,
                templateUrl: 'views/classRegistry/timeDialog.html',
                targetEvent: event,
                locals: { time: lateEntrance ? lateEntrance.timestamp : null, title: 'Entrata posticipata' }
            })
                .then(function (response) {
                    if (response) {
                        if(lateEntrance) {
                            _.remove($scope.classRegistry.lateEntrances, lateEntrance);
                        }
                        $scope.classRegistry.lateEntrances.push({
                            student: student._id,
                            timestamp: response.time
                        });
                    } else {
                        _.remove($scope.classRegistry.lateEntrances, lateEntrance);
                    }
                    $scope.clearSelection();
                });
        };

        $scope.addEarlyLeave = function () {
            var student = _.find($scope.classStudents, function (student) {
                return student.selected;
            });

            var earlyLeave = _.find($scope.classRegistry.earlyLeaves, function (earlyLeave) {
                return earlyLeave.student === student._id;
            });

            $mdDialog.show({
                controller: TimeDialogCtrl,
                templateUrl: 'views/classRegistry/timeDialog.html',
                targetEvent: event,
                locals: { time: earlyLeave ? earlyLeave.timestamp : null, title: 'Uscita anticipata' }
            })
                .then(function (response) {
                    if (response) {
                        if (earlyLeave) {
                            _.remove($scope.classRegistry.earlyLeaves, earlyLeave);
                        }
                        $scope.classRegistry.earlyLeaves.push({
                            student: student._id,
                            timestamp: response.time
                        });
                    } else {
                        _.remove($scope.classRegistry.earlyLeaves, earlyLeave);
                    }
                    $scope.clearSelection();
                });
        };

        $scope.studentIsAbsent = function (student) {
            return $scope.classRegistry &&
                _.contains($scope.classRegistry.absences, student._id);
        };

        $scope.studentHasLeft = function (student) {
            return $scope.classRegistry &&
                _.some($scope.classRegistry.earlyLeaves, function (earlyLeave) {
                    return earlyLeave.student === student._id;
                });
        };

        $scope.studentHasEntered = function (student) {
            return $scope.classRegistry &&
                _.some($scope.classRegistry.lateEntrances, function (lateEntrance) {
                    return lateEntrance.student === student._id;
                });
        };
//
//        $scope.checkSubstitution = function (slot) {
//            if (!slot.isSubstitution) {
//                delete slot.substitution;
//            }
//        };
//
//        var SelectTimeCtrl = function ($scope, $modalInstance, time) {
//            $scope.data = {
//                time: time
//            };
//
//            $scope.ok = function () {
//                $modalInstance.close($scope.data.time);
//            };
//
//            $scope.cancel = function () {
//                $modalInstance.dismiss('cancel');
//            };
//
//        };

        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };



        /**
         * Converte il formato degli orari.
         * @param classRegistry
         */
        var serializeData = function (classRegistry) {

            classRegistry.lateEntrances = _.map(classRegistry.lateEntrances, function (lateEntrance) {
                lateEntrance.timestamp = lateEntrance.timestamp.valueOf() / (60 * 1000);
                return lateEntrance;
            });

            classRegistry.earlyLeaves = _.map(classRegistry.earlyLeaves, function (earlyLeave) {
                earlyLeave.timestamp = earlyLeave.timestamp.valueOf() / (60 * 1000);
                return earlyLeave;
            });

            return classRegistry;
        };

        /**
         * Converte il formato degli orari.
         * @param classRegistry
         */
        var deserializeData = function (classRegistry) {

            classRegistry.lateEntrances = _.map(classRegistry.lateEntrances, function (lateEntrance) {
                lateEntrance.timestamp = new Date(lateEntrance.timestamp * 60 * 1000);
                return lateEntrance;
            });

            classRegistry.earlyLeaves = _.map(classRegistry.earlyLeaves, function (earlyLeave) {
                earlyLeave.timestamp = new Date(earlyLeave.timestamp * 60 * 1000);
                return earlyLeave;
            });

            return classRegistry;
        };

        var TimeDialogCtrl = function ($scope, $mdDialog, time, title) {
            var currentTime = new Date();
            currentTime.setFullYear(1970);
            currentTime.setMonth(1);
            currentTime.setDate(1);
            currentTime.setSeconds(0);
            currentTime.setMilliseconds(0);

            $scope.deleteEnabled = !!time;
            $scope.time = time ? time : currentTime;
            $scope.title = title;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function (isValid) {
                if (isValid) {
                    $mdDialog.hide({ time: $scope.time });
                }
            };

            $scope.delete = function () {
                $mdDialog.hide();
            };
        };
    });