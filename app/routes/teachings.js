'use strict';

// Teachings routes use teachings controller
var teachings = require('../controllers/teachings');

module.exports = function(app) {

    app.get('/teachings', teachings.all);
    app.post('/teachings', teachings.create);
    app.get('/teachings/:teachingId', teachings.show);
    app.put('/teachings/:teachingId', teachings.update);
    app.del('/teachings/:teachingId', teachings.destroy);

    // Finish with setting up the teachingId param
    app.param('teachingId', teachings.teaching);

};