'use strict';

// Feedback routes
var feedbacks = require('../controllers/feedbacks');

module.exports = function(app) {

    app.post('/feedbacks', feedbacks.create);

};