'use strict';

// Students routes use students controller
var students = require('../controllers/students'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/students', auth.check, students.all);
    app.post('/schools/:schoolId/complexes/:complexId/students', auth.check, students.create);
    app.get('/schools/:schoolId/complexes/:complexId/students/:studentId', students.student, auth.check, students.show);
    app.put('/schools/:schoolId/complexes/:complexId/students/:studentId', students.student, auth.check, students.update);
    app.delete('/schools/:schoolId/complexes/:complexId/students/:studentId', students.student, auth.check, students.destroy);

};