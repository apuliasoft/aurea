'use strict';

// Teaching Registry routes use teachingRegistry controller
var teachingRegistry = require('../controllers/teachingRegistry');

module.exports = function(app) {

    app.get('/teachingRegistries/:teachingRegistryDate', teachingRegistry.show);
    app.put('/teachingRegistries/:teachingRegistryDate', teachingRegistry.createOrUpdate);

    // Finish with setting up the teachingRegistryDate param
    app.param('teachingRegistryDate', teachingRegistry.teachingRegistry);

};