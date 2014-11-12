'use strict';

angular.module('aurea.academicYears')
    .controller('AcademicYearsCtrl', function ($scope, $state, $stateParams, $filter, $mdToast, SmartState, _, Global, AcademicYear) {
        $scope.global = Global;

        $scope.goToListAcademicYears = function () {
            SmartState.go('all academic years');
        };

        $scope.goToCreateAcademicYear = function () {
            SmartState.go('create academic year');
        };

        $scope.goToEditAcademicYear = function (academicYear) {
            SmartState.go('edit academic year', { academicYearId: academicYear._id });
        };

        $scope.goToListSchoolClasses = function (academicYear) {
            SmartState.go('all school classes', { academicYearId: academicYear._id });
        };

        $scope.find = function () {
            AcademicYear.query({
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (academicYears) {
                    $scope.academicYears = academicYears;
                });
        };

        $scope.init = function () {
            if ($state.current.data.editMode) {
                $scope.title = 'Modifica anno accademico';
                findOne();
            } else {
                $scope.title = 'Nuovo anno accademico';
                prepare();
            }
        };

        $scope.save = function (isValid) {
            if (isValid) {
                var academicYear = serializeData($scope.academicYear);
                if ($state.current.data.editMode) {
                    update(academicYear);
                } else {
                    create(academicYear);
                }
            }
        };

        $scope.switchDay = function (day) {
            if (day.active) {
                var last = _.findLast($scope.academicYear.timeTable, function (cur) {
                    return cur !== day && cur.active && cur.slots.length;
                });
                if (last) {
                    day.slots = _.cloneDeep(last.slots);
                } else {
                    $scope.addTimeSlot(day);
                }
            } else {
                day.slots.length = 0;
            }
        };

        $scope.addTimeSlot = function (day) {
            var start = new Date(1970, 0, 1, 8, 30, 0);
            var duration = 60 * 60 * 1000; // 60 minutes

            if (day.slots.length === 1) {
                var last = _.last(day.slots);
                if (last.end) {
                    start = new Date(last.end.valueOf());
                    if (last.start) {
                        duration = last.end.valueOf() - last.start.valueOf();
                    }
                }
            } else if (day.slots.length > 1) {
                var lasts = _.last(day.slots, 2);
                if (lasts[0].start && lasts[1].start) {
                    start = new Date(lasts[1].start.valueOf() + (lasts[1].start.valueOf() - lasts[0].start.valueOf()));
                    if (lasts[1].end) {
                        duration = lasts[1].end.valueOf() - lasts[1].start.valueOf();
                    }
                }
            }
            var end = new Date(start.valueOf() + duration);

            day.slots.push({
                start: start,
                end: end
            });
        };

        $scope.removeTimeSlot = function (day, index) {
            day.slots.splice(index, 1);
        };

        $scope.remove = function (academicYear) {
            if (academicYear) {
                academicYear.$remove();
                _.remove($scope.academicYears, academicYear);
                $scope.goToListAcademicYears();
                $mdToast.show({
                    template: '<md-toast>Anno accademico cancellato</md-toast>',
                    hideDelay: 2000
                });
            }
        };

        var prepare = function () {
            $scope.academicYear = new AcademicYear({
                school: Global.getSchool()._id,
                complex: Global.getComplex()._id,
                timeTable: baseTimeTable()
            });
        };

        var findOne = function () {
            AcademicYear.get({
                academicYearId: $stateParams.academicYearId,
                complexId: Global.getComplex()._id,
                schoolId: Global.getSchool()._id
            }).$promise
                .then(function (academicYear) {
                    $scope.academicYear = deserializeData(academicYear);
                });
        };

        var create = function (academicYear) {
            academicYear.$save(function () {
                $scope.goToListAcademicYears();
                $mdToast.show({
                    template: '<md-toast>Anno accademico creato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        var update = function (academicYear) {
            if (!academicYear.updated) {
                academicYear.updated = [];
            }
            academicYear.updated.push(new Date().getTime());

            academicYear.$update(function (response) {
                $scope.goToListAcademicYears(response);
                $mdToast.show({
                    template: '<md-toast>Anno accademico aggiornato</md-toast>',
                    hideDelay: 2000
                });
            });
        };

        /**
         * Genera gli slot vuoti.
         */
        var baseTimeTable = function () {
            var timeTable = _.map(_.range(1, 8), function (num) {
                var result = {};
                result.weekDay = num;
                result.active = false;
                result.slots = [];
                return result;
            });
            return timeTable;
        };

        /**
         * Elimina gli slot vuoti e converte il formato degli slot orari.
         * @param academicYear
         */
        var serializeData = function (academicYear) {
            var result = _.cloneDeep(academicYear);
            result.timeTable = _.chain(academicYear.timeTable)
                .filter(function (day) {
                    return day.active && day.slots.length;
                })
                .map(function (day) {
                    var result = {};
                    result.weekDay = day.weekDay;
                    result.slots = _.chain(day.slots)
                        .filter(function (slot) {
                            return slot.start && slot.end;
                        })
                        .map(function (slot) {
                            var result = {};
                            result.start = slot.start.valueOf() / (60 * 1000);
                            result.end = slot.end.valueOf() / (60 * 1000);
                            return result;
                        }).value();
                    return result;
                }).value();

            return new AcademicYear(result);
        };

        /**
         * Aggiunge gli slot vuoti se necessario e converte il formato degli slot orari.
         * @param academicYear
         */
        var deserializeData = function (academicYear) {
            academicYear.startDate = new Date(academicYear.startDate);
            academicYear.endDate = new Date(academicYear.endDate);

            var timeTable = _.map(academicYear.timeTable, function (day) {
                var result = {};
                result.weekDay = day.weekDay;
                result.active = true;
                result.slots = _.map(day.slots, function (slot) {
                    var result = {};
                    result.start = new Date(slot.start * 60 * 1000);
                    result.end = new Date(slot.end * 60 * 1000);
                    return result;
                });
                return result;
            });

            academicYear.timeTable = _.map(baseTimeTable(), function (baseSlot) {
                var slot = _.find(timeTable, function (slot) {
                    return slot.weekDay === baseSlot.weekDay;
                }) || baseSlot;
                return slot;
            });

            return academicYear;
        };
    });
