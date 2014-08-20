'use strict';

// Academic years routes use academicYears controller
var academicYears = require('../controllers/academicYears');

module.exports = function(app) {

    app.get('/complexes/:complexId/academicYears', academicYears.all);
    app.post('/complexes/:complexId/academicYears', academicYears.create);
    app.get('/complexes/:complexId/academicYears/:academicYearId', academicYears.show);
    app.put('/complexes/:complexId/academicYears/:academicYearId', academicYears.update);
    app.del('/complexes/:complexId/academicYears/:academicYearId', academicYears.destroy);

    app.get('/academicYears/getTimeTable', academicYears.getTimeTable);

    // Finish with setting up the academicYearId param
    app.param('academicYearId', academicYears.academicYear);

};