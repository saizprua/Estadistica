(function(){
'use strict';

angular
    .module('mean.iti')
    .factory('Iti',Iti);

    Iti.$inject = ['$resource'];

    function Iti($resource) {

    return $resource('api/iti/:itiId',{itiId:'@id'},{
       'update': { method:'PUT' }
    });

   }

})();
