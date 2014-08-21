'use strict';

// School classes routes use schoolClasses controller
var schoolClasses = require('../controllers/schoolClasses');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses', schoolClasses.all);
    app.post('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses', schoolClasses.create);
    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.schoolClass, schoolClasses.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.schoolClass, schoolClasses.update);
    app.del('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.destroy);

    // Finish with setting up the schoolClassId param
    // app.param('schoolClassId', schoolClasses.schoolClass);

};