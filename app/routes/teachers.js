'use strict';

// Teachers routes use teachers controller
var teachers = require('../controllers/teachers');

module.exports = function(app) {

    app.get('/teachers', teachers.all);
    app.post('/teachers', teachers.create);
    app.get('/teachers/:teacherId', teachers.show);
    app.put('/teachers/:teacherId', teachers.update);
    app.del('/teachers/:teacherId', teachers.destroy);

    // Finish with setting up the teacherId param
    app.param('teacherId', teachers.teacher);

};