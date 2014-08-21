'use strict';

// Teachers routes use teachers controller
var teachers = require('../controllers/teachers');

module.exports = function(app) {

    app.get('/complexes/:complexId/teachers', teachers.all);
    app.post('/complexes/:complexId/teachers', teachers.create);
    app.get('/complexes/:complexId/teachers/:teacherId', teachers.show);
    app.put('/complexes/:complexId/teachers/:teacherId', teachers.update);
    app.del('/complexes/:complexId/teachers/:teacherId', teachers.destroy);

    // Finish with setting up the teacherId param
    // app.param('teacherId', teachers.teacher);

};