'use strict';

angular.module('aurea', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router',
  'aurea.system', 'aurea.schools', 'aurea.teachers', 'aurea.students',
  'aurea.academicYears', 'aurea.schoolClasses', 'aurea.teachings']);

angular.module('aurea.system', []);
angular.module('aurea.schools', []);
angular.module('aurea.teachers', []);
angular.module('aurea.students', []);
angular.module('aurea.academicYears', []);
angular.module('aurea.schoolClasses', []);
angular.module('aurea.teachings', []);