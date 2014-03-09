'use strict';

// Students routes use students controller
var students = require('../controllers/students');

module.exports = function(app) {

    app.get('/students', students.all);
    app.post('/students', students.create);
    app.get('/students/:studentId', students.show);
    app.put('/students/:studentId', students.update);
    app.del('/students/:studentId', students.destroy);

    // Finish with setting up the studentId param
    app.param('studentId', students.student);

};