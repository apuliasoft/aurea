'use strict';

// School classes routes use schoolClasses controller
var schoolClasses = require('../controllers/schoolClasses'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses', schoolClasses.all);
    app.post('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses', schoolClasses.create);
    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.schoolClass, auth.check, schoolClasses.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.schoolClass, auth.check, schoolClasses.update);
    app.delete('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId', schoolClasses.schoolClass, auth.check, schoolClasses.destroy);

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students', schoolClasses.schoolClass, auth.check, schoolClasses.allStudents);
    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId', schoolClasses.schoolClass, auth.check, schoolClasses.studentStats);

};