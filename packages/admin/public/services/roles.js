(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('Roles',Roles);

    Roles.$inject = ['$resource'];

    function Roles($resource){

        return $resource('api/roles?roleId=:roleId',{roleId:'@id'},{
            'update': { method:'PUT' }
        });

    }
}());