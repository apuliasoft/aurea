'use strict';

// Academic years routes use academicYears controller
var academicYears = require('../controllers/academicYears');

module.exports = function(app) {

    app.get('/academicYears', academicYears.all);
    app.post('/academicYears', academicYears.create);
    app.get('/academicYears/:academicYearId', academicYears.show);
    app.put('/academicYears/:academicYearId', academicYears.update);
    app.del('/academicYears/:academicYearId', academicYears.destroy);

    // Finish with setting up the academicYearId param
    app.param('academicYearId', academicYears.academicYear);

};