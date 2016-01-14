(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('MenuRoles',MenuRoles);

    MenuRoles.$inject = ['$resource'];

    function MenuRoles($resource){

        return $resource('api/menu-roles?menuRoleId=:menuRoleId',{menuRoleId:'@id'},{
            'update': { method:'PUT' }
        });

    }
}());