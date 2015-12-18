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
    'oc.lazyLoad',
    'formly',
    'formlyBootstrap',
    'datatables',
    'oitozero.ngSweetAlert',

  /*feature areas*/
    'mean.system',
    'mean.users',
    'mean.ses',
    'mean.iti',
    'mean.admin'
]);

angular.module('mean.system', []);
angular.module('mean.users',[]);
angular.module('mean.ses',[]);
angular.module('mean.iti',[]);
angular.module('mean.admin',[]);
