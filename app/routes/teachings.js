'use strict';

// Teachings routes use teachings controller
var teachings = require('../controllers/teachings'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings', auth.check, teachings.all);
    app.post('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings', auth.check, teachings.create);
    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId', teachings.teaching, auth.check, teachings.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId', teachings.teaching, auth.check, teachings.update);
    app.delete('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId', teachings.teaching, auth.check, teachings.destroy);

    app.get('/schools/:schoolId/complexes/:complexId/teachers/:teacherId/academicYears/:academicYearId/teachings', auth.check, teachings.allByTeacher);
    app.get('/schools/:schoolId/complexes/:complexId/teachers/:teacherId/academicYears/:academicYearId/teachings/:teachingId', teachings.teachingByTeacher, auth.check, teachings.showByTeacher);

};