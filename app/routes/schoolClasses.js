'use strict';

// School classes routes use schoolClasses controller
var schoolClasses = require('../controllers/schoolClasses');

module.exports = function(app) {

    app.get('/schoolClasses', schoolClasses.all);
    app.post('/schoolClasses', schoolClasses.create);
    app.get('/schoolClasses/:schoolClassId', schoolClasses.show);
    app.put('/schoolClasses/:schoolClassId', schoolClasses.update);
    app.del('/schoolClasses/:schoolClassId', schoolClasses.destroy);

    // Finish with setting up the schoolClassId param
    app.param('schoolClassId', schoolClasses.schoolClass);

};