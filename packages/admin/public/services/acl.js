(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('AclPermission',AclPermission);

    AclPermission.$inject = ['Global'];

    function AclPermission(Global){

        var g = Global;

        var gr = g.aclRoles;

        return allow;

        function allow(api, t){

            if(!!Global.isAdmin) return true;

            if(!gr && gr === 0) return false;

            var res = false;
            for(var i = 0; i < gr.length; i++){
                var grs = gr[i];
                if(grs.ruta === api){
                   var m =  grs.metodos.split(',');
                    res = m.indexOf(t) > -1;
                    break;
                }
            }

            return res;
        }

    }
}());