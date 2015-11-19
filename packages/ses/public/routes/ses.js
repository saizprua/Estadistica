(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean.ses')
         .config(config);

  config.$inject = ['$stateProvider'];


  function config($stateProvider){

      // states for my app
      $stateProvider
      .state('ses', {
        url: '/ses-resumen',
        templateUrl: 'ses/views/index.html',
        controller: 'SesController',
        controllerAs: 'vm',
        resolve: {
                loggedin: function(MeanUser){
                  MeanUser.checkLoggedin();
                }
          }
      });

  }

})();
