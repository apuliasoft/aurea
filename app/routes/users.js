'use strict';

// User routes use users controller
var users = require('../controllers/users');
var passport = require('passport');

module.exports = function(app) {

    // Setting the local strategy route
    app.get('/loggedin', users.loggedin);
    app.post('/login',
      passport.authenticate('local'),
      function(req, res) {
          // If this function gets called, authentication was successful.
          // `req.user` contains the authenticated user.
          //res.redirect('/users/' + req.user.username);
          res.end('1');
      });

    // Setting up the users api
    app.get('/users', users.all);
    app.post('/users', users.create);
    app.get('/users/:userId', users.show);
    app.put('/users/:userId', users.update);
    app.del('/users/:userId', users.destroy);

    // Setting up the userId param
    app.param('userId', users.user);
};
