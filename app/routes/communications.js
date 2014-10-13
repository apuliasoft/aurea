'use strict';

// Students routes use students controller
var communications = require('../controllers/communications'),
    auth = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/schools/:schoolId/communications', auth.check, communications.all);
    app.post('/schools/:schoolId/communications', auth.check, communications.create);
    app.get('/schools/:schoolId/communications/:communicationId', communications.communication, auth.check, communications.show);
    app.put('/schools/:schoolId/communications/:communicationId', communications.communication, auth.check, communications.update);
    app.delete('/schools/:schoolId/communications/:communicationId', communications.communication, auth.check, communications.destroy);

};