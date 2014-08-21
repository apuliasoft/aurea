'use strict';

// Students routes use students controller
var students = require('../controllers/students');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/students', students.all);
    app.post('/schools/:schoolId/complexes/:complexId/students', students.create);
    app.get('/schools/:schoolId/complexes/:complexId/students/:studentId', students.student, students.show);
    app.put('/schools/:schoolId/complexes/:complexId/students/:studentId', students.student, students.update);
    app.del('/schools/:schoolId/complexes/:complexId/students/:studentId', students.destroy);

    app.get('/students/:studentId/parents', students.allParents);
    app.post('/students/:studentId/parents', students.createParent);

    // Finish with setting up the studentId param
//    app.param('studentId', students.student);

};