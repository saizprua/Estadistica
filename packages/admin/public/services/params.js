(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('Params',Params);

    Params.$inject = ['$resource'];

    function Params($resource){

        return $resource('api/config/:configId',{configId:'@id'},{
            'update': { method:'PUT' }
        });

    }
}());