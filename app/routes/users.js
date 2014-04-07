'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(app) {

    /*app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);*/

    // Setting up the users api
    app.get('/users', users.all);
    app.post('/users', users.create);
    app.get('/users/:userId', users.show);
    app.put('/users/:userId', users.update);
    app.del('/users/:userId', users.destroy);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
   /* app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);*/
};
