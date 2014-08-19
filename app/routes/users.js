'use strict';

// User routes use users controller
var users = require('../controllers/users');
var passport = require('passport');
var auth = require('./middlewares/authorization');

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
    app.post('/logout', function(req, res){
        throw new Exception();
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
