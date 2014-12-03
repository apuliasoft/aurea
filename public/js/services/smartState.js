'use strict';

//Province service used to serve provinces
angular.module('aurea')
    .factory('SmartState', function ($state, $stateParams, $filter, _, Global) {
        return {
            go: function (name, params) {
                var user = Global.getUser();

                // 1. parametri passati come parametro
                params = params || {};

                var nextState = $state.get(name);

                // 2. parametri inferiti dalla URL
                _.filter(nextState.url.split('/'), function (elem) {
                    return elem.charAt(0) === ':';
                }).map(function (elem) {
                    return elem.substring(1);
                }).forEach(function (elem) {
                    if ($stateParams[elem] && !params[elem]) {
                        params[elem] = $stateParams[elem];
                    }
                });

                // 3. parametri inferiti dal contesto dell'utente
                if (user.school && !params.schoolId) {
                    params.schoolId = user.school;
                }

                if (user.complex && !params.complexId) {
                    params.complexId = user.complex;
                }

                // 4. parametri inferiti dalla data
                var academicYear = Global.getAcademicYear();
                if (nextState.url.indexOf(':date') && !params.date && academicYear) {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);

                    var startDate = new Date(academicYear.startDate);
                    var endDate = new Date(academicYear.endDate);

                    var weekDays = _.map(academicYear.timeTable, function (slot) {
                        return slot.weekDay;
                    });

                    if (date < startDate) {
                        date = startDate;
                        while (!weekDays.indexOf(date.getDay())) {
                            date.setDate(date.getDate() + 1);
                        }
                    } else if (date > endDate) {
                        date = endDate;
                        while (!weekDays.indexOf(date.getDay())) {
                            date.setDate(date.getDate() - 1);
                        }
                    }
                    params.date = $filter('date')(date, 'yyyy-MM-dd');
                }

                //TODO controllate l'opzione 'inherit' del metodo go
                $state.go(name, params)
                    .catch(function (err) {
                        console.log(name);
                        console.error(err);
                    });
            }
        };
    });