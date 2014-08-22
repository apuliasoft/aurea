'use strict';

// Teachers routes use teachers controller
var teachers = require('../controllers/teachers'),
    auth = require('./middlewares/authorization');

module.exports = function (app) {

    app.get('/schools/:schoolId/complexes/:complexId/teachers', teachers.all);
    app.post('/schools/:schoolId/complexes/:complexId/teachers', teachers.create);
    app.get('/schools/:schoolId/complexes/:complexId/teachers/:teacherId', teachers.teacher, auth.check, teachers.show);
    app.put('/schools/:schoolId/complexes/:complexId/teachers/:teacherId', teachers.teacher, auth.check, teachers.update);
    app.del('/schools/:schoolId/complexes/:complexId/teachers/:teacherId', teachers.destroy);

    // Finish with setting up the teacherId param
    // app.param('teacherId', teachers.teacher);

};