'use strict';

// User routes use users controller
var users = require('../controllers/users');
var passport = require('passport');
var auth = require('./middlewares/authorization');
var _ = require('lodash');

module.exports = function(app) {

    // Setting the local strategy route
    app.get('/loggedin', users.loggedin);
    app.post('/login',
      passport.authenticate('local'),
      function(req, res) {
          // If this function gets called, authentication was successful.
          // `req.user` contains the authenticated user.
          res.jsonp(_.pick(req.user, ['_id', 'name', 'username', 'eamil', 'role']));
      });
    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    // Setting up the users api
    app.get('/users', auth.check, users.all);
    app.post('/users', users.create);
    app.get('/users/:userId', auth.check, users.show);
    app.put('/users/:userId', users.update);
    app.del('/users/:userId', users.destroy);

    // Setting up the userId param
    app.param('userId', users.user);
};
