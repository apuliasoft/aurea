'use strict';

angular.module('aurea')
    .directive('d3Bars', function ($window, $timeout, d3Service) {
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                onClick: '&'
            },
            link: function (scope, ele, attrs) {
                d3Service.d3().then(function (d3) {

                    var margin = parseInt(attrs.margin) || 20,
                        barHeight = parseInt(attrs.barHeight) || 20,
                        barPadding = parseInt(attrs.barPadding) || 5;

                    var svg = d3.select(ele[0])
                        .append('svg')
                        .style('width', '100%');

                    // Browser onresize event
                    window.onresize = function () {
                        scope.$apply();
                    };

                    // Watch for resize event
                    scope.$watch(function () {
                        return angular.element($window)[0].innerWidth;
                    }, function () {
                        scope.render(scope.data);
                    });

                    scope.$watch('data', function (newData) {
                        scope.render(newData);
                    }, true);

                    scope.render = function (data) {
                        // remove all previous items before render
                        svg.selectAll('*').remove();

                        // If we don't pass any data, return out of the element
                        if (!data) return;

                        // setup variables
                        var width = d3.select(ele[0]).node().offsetWidth - margin,
                        // calculate the height
                            height = scope.data.length * (barHeight + barPadding),
                        // Use the category20() scale function for multicolor support
                            color = d3.scale.category20(),
                        // our xScale
                            xScale = d3.scale.linear()
                                .domain([0, 31])
                                .range([0, width]);

                        // set the height based on the calculations above
                        svg.attr('height', height);

                        //create the rectangles for the bar chart
                        svg.selectAll('rect')
                            .data(data).enter()
                            .append('rect')
                            .attr('height', barHeight)
                            .attr('width', 140)
                            .attr('x', 110)
                            .attr('y', function (d, i) {
                                return i * (barHeight + barPadding);
                            })
                            .attr('fill', function (d) {
                                return color(d.value);
                            })
                            .attr('width', function (d) {
                                return xScale(d.value);
                            });

                        var baseSelection = svg.selectAll('text');

                        baseSelection
                            .data(data)
                            .enter()
                            .append('text')
                            .attr('font-family', 'monospace')
                            .attr('fill', '#000')
                            .attr('y', function (d, i) {
                                return i * (barHeight + barPadding) + 15;
                            })
                            .attr('x', 15)
                            .text(function (d) {
                                return d.name;
                            });

                        baseSelection
                            .data(data)
                            .enter()
                            .append('text')
                            .attr('font-family', 'monospace')
                            .attr('fill', '#fff')
                            .attr('y', function (d, i) {
                                return i * (barHeight + barPadding) + 15;
                            })
                            .attr('x', 114)
                            .text(function (d) {
                                return d.value > 0 ? d.value : '';
                            });
                    };

                });
            }
        };
    });