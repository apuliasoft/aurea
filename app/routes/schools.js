'use strict';

// Schools routes use schools controller
var schools = require('../controllers/schools');

module.exports = function(app) {

    app.get('/schools', schools.all);
    app.post('/schools', schools.create);
    app.get('/schools/:schoolId', schools.show);
    app.put('/schools/:schoolId', schools.update);
    app.del('/schools/:schoolId', schools.destroy);

    // Finish with setting up the schoolId param
    app.param('schoolId', schools.school);

};