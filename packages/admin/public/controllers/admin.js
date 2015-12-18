(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('Controller', adminController);

    adminController.$inject = ['$state'];

    function adminController($state) {
        var vm = this;

        console.log(vm);

        console.log(angular.toJson($state.get()));


        //call method init
        init();

        //method init
        function init() {

        }
    }
}());