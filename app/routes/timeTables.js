'use strict';

// Time Tables routes use timeTables controller
var timeTables = require('../controllers/timeTables');

module.exports = function(app) {

    app.get('/timetables', timeTables.all);
    app.post('/timetables', timeTables.create);
    app.get('/timetables/:timeTableId', timeTables.show);
    app.put('/timetables/:timeTableId', timeTables.update);
    app.del('/timetables/:timeTableId', timeTables.destroy);

    // Finish with setting up the teachingId param
    app.param('timeTableId', timeTables.timeTable);

};