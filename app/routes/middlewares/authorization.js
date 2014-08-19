'use strict';

var _ = require('lodash');

var authorizations = [
    {
        role: 'admin',
        method: '*',
        path: '*'
    },
    {
        role: '*',
        method: 'GET',
        path: '/users/:userId',
        custom: function (req) {
            return req.user._id.toString() === req.params.userId;
        }
    }
];




////////////////////

function match(req, authorization, path, role, method) {
    return (
        (authorization.role === '*' || authorization.role === role) &&
        (authorization.method === '*' || authorization.method === method) &&
        (authorization.path === '*' || authorization.path === path) &&
        (authorization.custom === undefined || authorization.custom(req))
    );
}

exports.check = function(req, res, next) {
    if (!req.user) next();

    var isAuthorized = false;

    _.forEach(authorizations, function(authorization){
        if (match(req, authorization, req.route.path, req.user.role, req.method)) {
            isAuthorized = true;
        }
    });

    if (isAuthorized)
        next();
    else
        res.send(401, 'Non sei autorizzato ad accedere a questa risorsa');
};