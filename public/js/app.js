'use strict';

angular.module('aurea', [
    'ngCookies',
    'ngResource',
    'ngStorage',
    'ui.bootstrap',
    'ui.router',
    'aurea.system',
    'aurea.users',
    'aurea.schools',
    'aurea.complexes',
    'aurea.teachers',
    'aurea.students',
    'aurea.academicYears',
    'aurea.schoolClasses',
    'aurea.teachings',
    'aurea.timeTables',
    'aurea.classRegistry',
    'aurea.teachingRegistry'
]);

angular.module('aurea.system', []);
angular.module('aurea.users', []);
angular.module('aurea.schools', []);
angular.module('aurea.complexes', []);
angular.module('aurea.teachers', []);
angular.module('aurea.students', []);
angular.module('aurea.academicYears', []);
angular.module('aurea.schoolClasses', []);
angular.module('aurea.teachings', []);
angular.module('aurea.timeTables', []);
angular.module('aurea.classRegistry', []);
angular.module('aurea.teachingRegistry', []);