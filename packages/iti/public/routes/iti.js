(function(){

  'use strict';
  //Setting up route
  angular
         .module('mean.iti')
         .config(config);

  config.$inject = ['$stateProvider' ,'$ocLazyLoadProvider'];

  function config($stateProvider, $ocLazyLoadProvider){

        $ocLazyLoadProvider.config({
          debug: true,
          events: true
        });

         $stateProvider
           .state('iti',{
                 url: '/iti-all',
                 templateUrl:'iti/views/index.html',
                 data: { pageTitle: 'Iti' },
                 controller:'ItiController',
                 controllerAs: 'vm',
                 resolve: {

                     loggedin: function(MeanUser) {
                         return MeanUser.checkLoggedin();
                     },
                     loadPlugin: function ($ocLazyLoad) {
                        return  $ocLazyLoad.load([
                             {
                                 serie: true,
                                 files: [
                                 'bower_components/datatables/media/css/dataTables.bootstrap.min.css',
                                 'bower_components/datatables/media/js/dataTables.bootstrap.min.js'
                               ]
                             }
                         ]).then(function () {
                           console.log('success');
                         },function (err) {
                           console.log(err);
                         });
                     }
                 }
             });

  }
})();
