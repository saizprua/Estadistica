(function(){
'use strict';
angular
    .module('mean.system')
    .controller('HeaderController',HeaderController);

    HeaderController.$inject = ['$http','$state', 'Global'];

    function HeaderController($http,$state,Global){
        var vm = this;
        vm.global = Global;
        
        // {  'title': 'Articles', 'link': 'articles'}
        vm.menu = [];

        vm.isCollapsed = false;
        vm.logout = logout;

        function logout(){
          $http.get('/api/logout').success(function() {
            vm.global = {
              user: false,
              authenticated: false
            };

            $state.go('auth.login');

          });
        }
    }
})();
