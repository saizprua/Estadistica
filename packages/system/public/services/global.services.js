//Global service for global variables
(function(){
  'use strict';
    angular
        .module('mean.system')
        .factory('Global',Global);

        Global.$inject = [];

        //window.user.roles = window.user && || false;
        function Global(){
          var _this = this;
          _this._data = {
              user: window.user,
              authenticated: !! window.user,
              isAdmin: window.isAdmin
          };
            if(window.user){
                _this._data.user.roles =  window.user.roles.split(',');
            }

          return _this._data;
        }
})();
