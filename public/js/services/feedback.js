'use strict';

//Feedback service used for complexes REST endpoint
angular.module('aurea.feedbacks')
    .factory('Feedback', function ($resource) {
        return $resource('feedbacks');
    });