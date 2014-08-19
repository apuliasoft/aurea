'use strict';

// Class Registry routes use classRegistry controller
var classRegistry = require('../controllers/classRegistry');

module.exports = function(app) {

    app.get('/classRegistries/:classId/:date', classRegistry.show);
    app.put('/classRegistries/:classId/:date', classRegistry.createOrUpdate);

};