'use strict';

// Students routes use students controller
var students = require('../controllers/students');

module.exports = function(app) {

    app.get('/complexes/:complexId/students', students.all);
    app.post('/complexes/:complexId/students', students.create);
    app.get('/complexes/:complexId/students/:studentId', students.show);
    app.put('/complexes/:complexId/students/:studentId', students.update);
    app.del('/complexes/:complexId/students/:studentId', students.destroy);

    // Finish with setting up the studentId param
//    app.param('studentId', students.student);

};