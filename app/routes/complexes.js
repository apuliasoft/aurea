'use strict';

// Complexes routes use complexes controller
var complexes = require('../controllers/complexes');

module.exports = function(app) {

    app.get('/complexes', complexes.all);
    app.post('/complexes', complexes.create);
    app.get('/complexes/:complexId', complexes.show);
    app.put('/complexes/:complexId', complexes.update);
    app.del('/complexes/:complexId', complexes.destroy);

    // Finish with setting up the complexId param
    app.param('complexId', complexes.complex);

};