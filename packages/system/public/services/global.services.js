//Global service for global variables
(function(){
  'use strict';
    angular
        .module('mean.system')
        .factory('Global',Global);

        Global.$inject = [];

        function Global(){
          var _this = this;
          _this._data = {
              user: window.user,
              authenticated: !! window.user,
              isAdmin: window.isAdmin
          };

          return _this._data;
        }
})();
