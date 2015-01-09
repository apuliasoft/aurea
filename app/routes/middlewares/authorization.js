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
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: '*',
        method: 'GET',
        path: '/schools'
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },


    // Complex
    {
        role: ['manager', 'teacher', 'student', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.complex.school &&
                req.complex.school === req.body.school;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },

    // Communication
    {
        role: '*',
        method: 'GET',
        path: '/schools/:schoolId/communications',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/communications',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.school.toString() === req.body.school;
        }
    },
    {
        role: '*',
        method: 'GET',
        path: '/schools/:schoolId/communications/:communicationId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/communications/:communicationId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.school.toString() === req.communication.school &&
              req.communication.school === req.body.school;
        }
    },
    {
        role: 'manager',
        method: 'DELETE',
        path: '/schools/:schoolId/communications/:communicationId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.school.toString() === req.communication.school;
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
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
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
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.academicYear.school.toString() &&
                req.academicYear.school.toString() === req.body.school &&
                req.academicYear.complex.toString() === req.body.complex;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },

    // Teacher
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/teachers',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/teachers',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/teachers/:teacherId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/teachers/:teacherId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.teacher.school.toString() &&
                req.teacher.school.toString() === req.body.school &&
                req.teacher.complex.toString() === req.body.complex;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/teachers/',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/teachers/:teacherId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: 'teacher',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/teachers/:teacherId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.teacher.school.toString() &&
                req.user.complex.toString() === req.params.complexId &&
                req.user.complex.toString() === req.parent.complex.toString() &&
                req.teacher.school.toString() === req.body.school &&
                req.teacher.complex.toString() === req.body.complex &&
                req.user._id.toString() === req.teacher.user.toString();
        }
    },

    // Student
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/students',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.student.school.toString() &&
                req.student.school.toString() === req.body.school &&
                req.student.complex.toString() === req.body.complex;
        }
    },
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: 'student',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.student.school.toString() &&
                req.user.school.toString() === req.body.school &&
                req.user.complex.toString() === req.params.complexId &&
                req.user.complex.toString() === req.student.complex.toString() &&
                req.user.complex.toString() === req.body.complex &&
                req.user._id.toString() === req.student.user._id.toString();
        }
    },

    // Parent
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.parent.school.toString() &&
                req.parent.school.toString() === req.body.school &&
                req.parent.complex.toString() === req.body.complex &&
                req.parent.student.toString() === req.body.student;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: 'parent',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/students/:studentId/parents/:parentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.parent.school.toString() &&
                req.user.complex.toString() === req.params.complexId &&
                req.user.complex.toString() === req.parent.complex.toString() &&
                req.parent.school.toString() === req.body.school &&
                req.parent.complex.toString() === req.body.complex &&
                req.parent.student.toString() === req.body.student &&
                req.user._id.toString() === req.parent.user.toString();
        }
    },

    // School class
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.schoolClass.school.toString() &&
                req.schoolClass.school.toString() === req.body.school &&
                req.schoolClass.complex.toString() === req.body.complex &&
                req.schoolClass.academicYear.toString() === req.body.academicYear;
        }
    },
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['manager'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: ['teacher'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId &&
              req.user.parent.student.toString() === req.params.studentId;
        }
    },
    {
        role: ['student'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/students/:studentId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId &&
              req.user.student._id.toString() === req.params.studentId;
        }
    },

    // Teaching
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings',
        custom: function (req) {
            console.log(req.user.school.toString());
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'POST',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.body.school;
        }
    },
    {
        role: 'manager',
        method: ['GET', 'DELETE'],
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.school.toString() === req.teaching.school.toString() &&
                req.teaching.school.toString() === req.body.school &&
                req.teaching.complex.toString() === req.body.complex &&
                req.teaching.academicYear.toString() === req.body.academicYear &&
                req.teaching.teacher.toString() === req.body.teacher &&
                req.teaching.schoolClass.toString() === req.body.schoolClass;
        }
    },
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/teachers/:teacherId/teachings',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/teachers/:teacherId/teachings/:teachingId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/teachers/:teacherId/teachings',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: ['student', 'teacher', 'parent'],
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/teachers/:teacherId/teachings/:teachingId',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
                req.user.complex.toString() === req.params.complexId;
        }
    },

    // class Registries
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.classRegistry.school.toString() === req.body.school &&
              req.classRegistry.complex.toString() === req.body.complex &&
              req.classRegistry.academicYear.toString() === req.body.academicYear &&
              req.classRegistry.schoolClass.toString() === req.body.schoolClass;
        }
    },
    {
        role: 'teacher',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: 'teacher',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/classRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId &&
              req.classRegistry.school.toString() === req.body.school &&
              req.classRegistry.complex.toString() === req.body.complex &&
              req.classRegistry.academicYear.toString() === req.body.academicYear &&
              req.classRegistry.schoolClass.toString() === req.body.schoolClass;
        }
    },

    // teaching registries
    {
        role: 'manager',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId;
        }
    },
    {
        role: 'manager',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.teachingRegistry.school.toString() === req.body.school &&
              req.teachingRegistry.complex.toString() === req.body.complex &&
              req.teachingRegistry.academicYear.toString() === req.body.academicYear &&
              req.teachingRegistry.schoolClass.toString() === req.body.schoolClass &&
              req.teachingRegistry.teaching.toString() === req.body.teaching &&
              req.teachingRegistry.teacher.toString() === req.body.teacher;
        }
    },
    {
        role: 'teacher',
        method: 'GET',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.user.complex.toString() === req.params.complexId;
        }
    },
    {
        role: 'teacher',
        method: 'PUT',
        path: '/schools/:schoolId/complexes/:complexId/academicYears/:academicYearId/schoolClasses/:schoolClassId/teachings/:teachingId/teachingRegistries/:date',
        custom: function (req) {
            return req.user.school.toString() === req.params.schoolId &&
              req.teachingRegistry.school.toString() === req.body.school &&
              req.teachingRegistry.complex.toString() === req.body.complex &&
              req.teachingRegistry.academicYear.toString() === req.body.academicYear &&
              req.teachingRegistry.schoolClass.toString() === req.body.schoolClass &&
              req.teachingRegistry.teaching.toString() === req.body.teaching &&
              req.teachingRegistry.teacher.toString() === req.body.teacher &&
              req.teachingRegistry.teacher.toString() === req.user._id.toString();
        }
    }

];


function match(req, authorization, path, role, method) {
    return (
        (authorization.role === '*' || authorization.role === role || _.contains(authorization.role, role)) &&
        (authorization.method === '*' || authorization.method === method || _.contains(authorization.method, method)) &&
        (authorization.path === '*' || authorization.path === path || _.contains(authorization.path, path)) &&
        (authorization.custom === undefined || authorization.custom(req))
        );
}

exports.check = function (req, res, next) {
    if (!req.user) return res.send(401, 'Non puoi accedere, si prega di effettuare il login');

//    console.log(req.route.path);
//    console.log(req.user.role);
//    console.log(req.method);

    var isAuthorized = _.find(authorizations, function (authorization) {
        if (match(req, authorization, req.route.path, req.user.role, req.method)) {
            return true;
        }
    });

//    console.log(isAuthorized);

    if (isAuthorized)
        next();
    else
        res.send(401, 'Non sei autorizzato ad accedere a questa risorsa');
};