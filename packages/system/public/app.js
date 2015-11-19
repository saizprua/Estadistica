'use strict';
angular.module('mean', [
  /* angular modules */
  'ngCookies',
  'ngResource',

  /*3rd-party modules*/
  'ui.router',
  'ui.bootstrap',
  'angles',
  'chart.js',

  /*feature areas*/
  'mean.system',
  'mean.users',
  'mean.ses'
]);

angular.module('mean.system', []);
angular.module('mean.users',[]);
angular.module('mean.ses',[]);
