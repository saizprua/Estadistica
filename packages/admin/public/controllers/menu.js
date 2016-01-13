
(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('MenuListController', MenuListController);

    MenuListController.$inject = ['MenuList']

    function MenuListController(MenuList){
        var vm = this;
        vm.menu = [];

        init();

        function init(){
            MenuList.query().$promise
                .then(function (menu) {
                    vm.menu = menu;
                }, function (err) {
                    vm.err = err;
                });
        }
    }
}());