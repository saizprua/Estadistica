(function () {
    'use strict';
    angular
        .module('mean.admin')
        .factory('ACL',ACL);

    ACL.$inject = ['$resource'];

    function ACL($resource){

        return $resource('api/acl/:aclId',{itiId:'@id'},{
            'update': { method:'PUT' }
        });

    }
}());