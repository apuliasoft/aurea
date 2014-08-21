'use strict';

var _ = require('lodash');

var authorizations = [
    {
        role: 'admin',
        method: '*',
        path: '*'
    },
    // User
    {
        role: '*',
        method: ['GET', 'PUT'],
        path: '/users/:userId',
        custom: function (req) {
            return req.user._id.toString() === req.params.userId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/users',
        custom: function (req) {
            return req.body.role === 'manager';
        }
    },
    {
        role: 'manager',
        method: 'DELETE',
        path: '/users/:userId',
        custom: function (req) {
            return req.body.role !== 'admin';
        }
    },

    // School
    {
        role: '*',
        method: 'GET',
        path: '/schools/:schoolId',
        custom: function (req) {
            return req.user.school === req.params.schoolId;
        }
    },

    // Complex
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes',
        custom: function (req) {
            return req.user.school === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes',
        custom: function (req) {
            return req.user.school === req.params.schoolId
              && req.user.school === req.complex.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school === req.params.schoolId
              && req.user.complex === req.params.complexId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school === req.params.schoolId
              && req.user.school === req.complex.school
              && req.user.complex === req.params.complexId
              && req.user.complex === req.complex._id;
        }
    },
    {
        role: '*',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school === req.params.schoolId
              && req.user.complex === req.params.complexId;
        }
    },

  // Academic Year
    {
        role: 'manager',
        method: '*',
        path: '/complexes/:complexId/academicYears/:academicYearId'
    },
    {
        role: 'manager',
        method: '*',
        path: '/complexes/:complexId/academicYears'
    },
    {
        role: '*',
        method: 'GET',
        path: '/complexes/:complexId/academicYears/:academicYearId',
        custom: function (req) {
            return req.user.complex === req.academicYear.complex

              && req.user.complex === req.params.complexId;
        }
    },
    {
        role: '*',
        method: 'GET',
        path: '/complexes/:complexId/academicYears',
        custom: function (req) {
            return req.user.complex === req.params.complexId;
        }
    }
];


////////////////////

function match(req, authorization, path, role, method) {
    return (
      (authorization.role === '*' || authorization.role === role || _.contains(authorization.role, role)) &&
      (authorization.method === '*' || authorization.method === method || _.contains(authorization.method, method)) &&
      (authorization.path === '*' || authorization.path === path || _.contains(authorization.path, path)) &&
      (authorization.custom === undefined || authorization.custom(req))
      );
}

exports.check = function (req, res, next) {
    if (!req.user) next();

    var isAuthorized = false;

    _.forEach(authorizations, function (authorization) {
        if (match(req, authorization, req.route.path, req.user.role, req.method)) {
            isAuthorized = true;
        }
    });

    if (isAuthorized)
        next();
    else
        res.send(401, 'Non sei autorizzato ad accedere a questa risorsa');
};