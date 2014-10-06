'use strict';

// Class Registry routes use classRegistry controller
var classRegistries = require('../controllers/classRegistry'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date', classRegistries.classRegistry, auth.check, classRegistries.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date', classRegistries.classRegistry, auth.check, classRegistries.createOrUpdate);

};