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
        vm.$state = $state;
        vm.isCollapsed = false;
        vm.menu = [];
        vm.logout = MeanUser.logout;
        vm.isActive = isActive;

        $http.get('/api/menu-tree').then(function (response) {
            var menu = response.data;

            menu.forEach(function (one) {
                one.child = [];
                 one.menus.forEach(function (two) {

                     // si el item tiene child menus
                     if(two.menus.length > 0) two.child = [];

                     // si el item path es un menu
                     if(two.path) one.child.push(two.path);

                     two.menus.forEach(function (three) {

                         // si existe el path
                         if(three.path) {
                             one.child.push(three.path);
                             two.child.push(three.path);
                         }
                     });
                 });
            });

            vm.menu = menu;

        }, function (err) {
            vm.err = err;
        });


      function isActive (arr){
            if(typeof arr === 'object' ){
              var cur = $state.current.name;
                return arr.indexOf(cur) > -1;
            }
            return false;
        }




    }
})();
