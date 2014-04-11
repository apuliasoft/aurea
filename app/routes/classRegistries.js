'use strict';

// Class Registry routes use classRegistry controller
var classRegistry = require('../controllers/classRegistry');

module.exports = function(app) {

    app.get('/classRegistries/:classRegistryDate', classRegistry.show);
    app.put('/classRegistries/:classRegistryDate', classRegistry.createOrUpdate);

    // Finish with setting up the academicYearId param
    app.param('classRegistryDate', classRegistry.classRegistry);

};