(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('MenuList',MenuList);

    MenuList.$inject = ['$resource'];

    function MenuList($resource){

        return $resource('api/menu?menuId=:menuId',{menuId:'@id'},{
            'update': { method:'PUT' }
        });

    }
}());