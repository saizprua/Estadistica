(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['ACL'];

    function AdminController(ACL) {
        var vm = this;

        console.log(vm);

        //call method init
        init();

        //method init
        function init() {
            ACL.query().$promise.then(function (data) {
                vm.data = data;
            }, function (err) {
                vm.err = err;
            })
        }
    }
}());