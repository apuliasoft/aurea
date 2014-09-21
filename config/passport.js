'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    Parent = mongoose.model('Parent'),
    config = require('./config'),
    _ = require('lodash');

module.exports = function(passport) {

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        //done(null, user._id);
        done(null, user);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(user, done) {
          done(null, user);
//        User.findOne({
//            _id: id
//        }, '-salt -hashed_password', function(err, user) {
//            done(err, user);
//        });
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Utente non trovato'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Password errata'
                    });
                }

                user = _.pick(user, ['_id', 'name', 'email', 'role', 'school', 'complex']);

                switch(user.role) {
                    case 'parent':
                        Parent.findOne({user: user._id}, function(err, parent){
                            user.parent = parent;
                            return done(null, user);
                        });
                        break;
                    default:
                        return done(null, user);
                }

            });
        }
    ));
};