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
              && req.user.school === req.body.school;
        }
    },
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.complex
              && req.user.school === req.params.schoolId
              && req.user.school === req.complex.school
              && req.complex.school === req.body.school;
        }
    },
    {
        role: ['student','teacher','parent'],
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
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/academicYears',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId
              && req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId',
        custom: function (req) {
            return req.academicYear
              && req.user.school.toString() === req.params.schoolId
              && req.user.school.toString() === req.academicYear.school.toString()
              && req.complex.school.toString() === req.body.school;
        }
    },
    {
        role: ['student','teacher','parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId
              && req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student','teacher','parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId
              && req.user.complex.toString() === req.params.complexId;
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
    if (!req.user) next(); // TODO: se non sono loggato dovrebbe dare errore

    var isAuthorized = _.find(authorizations, function (authorization) {
        if (match(req, authorization, req.route.path, req.user.role, req.method)) {
            return true;
        }
    });

    console.log(isAuthorized);

    if (isAuthorized)
        next();
    else
        res.send(401, 'Non sei autorizzato ad accedere a questa risorsa');
};