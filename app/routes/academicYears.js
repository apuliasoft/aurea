'use strict';

// Academic years routes use academicYears controller
var academicYears = require('../controllers/academicYears'),
  auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/academicYears', auth.check, academicYears.all);
    app.post('/schools/:schoolId/complexes/:complexId/academicYears', auth.check, academicYears.create);
    app.get('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId', academicYears.academicYear, auth.check, academicYears.show);
    app.put('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId', academicYears.academicYear, auth.check, academicYears.update);
    app.del('/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId', auth.check, academicYears.destroy);

    // Finish with setting up the academicYearId param
    // app.param('academicYearId', academicYears.academicYear);

};