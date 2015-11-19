(function() {
  'use strict';
    angular
      .module('mean.ses')
      .factory('SesService', SesService);

    function SesService($resource) {
      return $resource('/api/ses/all');
    }
}());
