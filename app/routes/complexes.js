'use strict';

// Complexes routes use complexes controller
var complexes = require('../controllers/complexes'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/complexes', complexes.all);
    app.post('/schools/:schoolId/complexes', complexes.create);
    app.get('/schools/:schoolId/complexes/:complexId', complexes.show);
    app.put('/schools/:schoolId/complexes/:complexId', complexes.complex, auth.check, complexes.update);
//    app.del('/schools/:schoolId/complexes/:complexId', complexes.destroy);

    // Finish with setting up the complexId param
    // app.param('complexId', complexes.complex);

};