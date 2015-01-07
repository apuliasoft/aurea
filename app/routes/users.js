'use strict';

// User routes use users controller
var users = require('../controllers/users');
var passport = require('passport');
var auth = require('./middlewares/authorization');

module.exports = function(app) {

    // Setting the local strategy route
    app.post('/login', passport.authenticate('local'), users.loggedin);
    app.get('/loggedin', users.loggedin);
    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    // Setting up the users api
    app.get('/users', auth.check, users.all);
    app.post('/users', auth.check, users.create);
    app.get('/users/:userId', auth.check, users.show);
    app.put('/users/:userId', auth.check, users.update);
    app.delete('/users/:userId', auth.check, users.destroy);

    // Setting up the userId param
    app.param('userId', users.user);
};
