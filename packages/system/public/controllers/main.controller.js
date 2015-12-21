 (function(){
   'use strict';
   angular
       .module('mean.system')
       .controller('MainCtrl', MainCtrl);

       MainCtrl.$inject = ['Global', 'MeanUser','$rootScope','$state'];

  function MainCtrl(Global, MeanUser, $rootScope, $state) {
      var vm = this;
      vm.global = Global;
      vm.logout = MeanUser.logout;

      $rootScope.$on('logout', function () {
          $state.go('auth.login');
      });

}

 })();
