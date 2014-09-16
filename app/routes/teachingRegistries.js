'use strict';

// Teaching Registry routes use teachingRegistry controller
var teachingRegistries = require('../controllers/teachingRegistry');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date', teachingRegistries.teachingRegistry, teachingRegistries.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date', teachingRegistries.teachingRegistry, teachingRegistries.createOrUpdate);


};