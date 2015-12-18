 (function(){
   'use strict';
   angular
       .module('mean.system')
       .controller('MainCtrl', MainCtrl);

       MainCtrl.$inject = ['Global', 'MeanUser'];

  function MainCtrl(Global, MeanUser) {
      var vm = this;
      vm.isValid = true;
      vm.global = Global;
      vm.logout = MeanUser.logout;

      vm.userName = 'Example user';
      vm.helloText = 'Welcome in SeedProject';
      vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
  }

 })();
