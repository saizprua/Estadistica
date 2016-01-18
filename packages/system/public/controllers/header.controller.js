(function(){
'use strict';
angular
    .module('mean.system')
    .controller('HeaderController',HeaderController);

    HeaderController.$inject = ['$http','$state', 'Global','MeanUser','MenuRoles','MenuList', '$scope'];

    function HeaderController($http,$state,Global,MeanUser,MenuRoles,MenuList, $scope){
        var vm = this;
        vm.global = Global;
        vm.user = Global.user;
        vm.$state = $state;
        vm.isCollapsed = false;
        vm.menu = [];
        vm.menuRoles = [];
        vm.menuList = [];
        vm.logout = MeanUser.logout;
        vm.isActive = isActive;
        vm.isVisible = isVisible;
        vm.parent = [];


        if(vm.global.authenticated) init();

        function init(){

            $http.get('/api/acl/roles').then(function (response) {
                vm.global.aclRoles =  response.data;
            });


            MenuRoles.query().$promise.then(function (data) {
                vm.menuRoles = data
                    .filter(function (i) {return vm.user.roles.indexOf(i.role.rol) > -1;})
                    .map(function (i) {return i.menu_id;});

            }, function (err) {
                vm.err = err;
            });

            MenuList.query().$promise.then(function (data) {
                vm.menuList = data;

                $scope.$watch('vm.$state.current.name',function(n){
                    if(n && vm.menuList.length > 0){
                        vm.parent = [];
                        var arr = vm.menuList.filter(function (l) {
                            return l.path === n;
                        })[0];

                        createParent(arr);
                    }
                });


            }, function (err) {
                vm.err = err;
            });
        }




        function createParent(arr){
            if(!arr) return;
            vm.parent.push(arr.id);
            if(arr.parent_id){
               var parent =  vm.menuList.filter(function (l) {
                    return l.id === arr.parent_id;
                })[0];
                createParent(parent);
            }

        }

        function isActive (arr){
           if(!arr) return false;
           return vm.parent.indexOf(arr.id) > -1;
        }

        function isVisible(arr){
            return arr.is_public || vm.menuRoles.indexOf(arr.id) > -1 || vm.global.isAdmin;
        }


    }
})();
