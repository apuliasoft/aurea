'use strict';

var _ = require('lodash');

var authorizations = [
  [ 'admin', 'get', 'users' ]
];

exports.check = function(req, res, next) {
    if (!req.user) next();

    var isAuthorized = false;

    _.forEach(authorizations, function(authorization){
       ;//if () //TODO controllare se il ruolo, metodo e risorsa compongono la riga di autorizzazione
    });

    // console.log(req.route.path);
    // console.log(req.user.roles);
    // console.log(req.method);



    next();
};