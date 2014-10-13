'use strict';

// Parents routes use students controller
var parents = require('../controllers/parents'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes/:complexId/students/:studentId/parents', auth.check, parents.all);
    app.post('/schools/:schoolId/complexes/:complexId/students/:studentId/parents', auth.check, parents.create);
    app.get('/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId', parents.parent, auth.check, parents.show);
    app.put('/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId', parents.parent, auth.check, parents.update);
    app.delete('/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId', parents.parent, auth.check, parents.destroy);

};