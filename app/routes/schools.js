'use strict';

// Schools routes use schools controller
var schools = require('../controllers/schools'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools', auth.check, schools.all);
    app.post('/schools', auth.check, schools.create);
    app.get('/schools/:schoolId', schools.school, auth.check, schools.show);
    app.put('/schools/:schoolId', schools.school, auth.check, schools.update);
    app.delete('/schools/:schoolId', schools.school, auth.check, schools.destroy);

};