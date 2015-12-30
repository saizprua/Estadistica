(function(){
'use strict';
angular
    .module('mean.system')
    .controller('HeaderController',HeaderController);

    HeaderController.$inject = ['$http','$state', 'Global','MeanUser'];

    function HeaderController($http,$state,Global,MeanUser){
        var vm = this;
        vm.global = Global;
        vm.user = Global.user;

        console.log(vm.global);

        // {  'title': 'Articles', 'link': 'articles'}
        vm.menu = [{title:'SES', link:'ses'}];

        vm.isCollapsed = false;
        vm.logout = MeanUser.logout;
    }
})();
