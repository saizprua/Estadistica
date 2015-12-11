(function() {
  'use strict';
  angular
    .module('mean.system')
    .factory('sAlert', Complementos);

    function Complementos($q, SweetAlert){

        return sweetConfirm;

        function sweetConfirm(params) {

          var config = {
              title: '',
              text: '',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Si, Confirmar',
              cancelButtonText: 'No, Revisar',
              closeOnConfirm: false,
              closeOnCancel: true
          };

          angular.extend(config, params);

           var deferred = $q.defer();
           SweetAlert.swal(config, function (isConfirm) {
             if(isConfirm) return deferred.resolve();
             deferred.reject();
           });


          return  deferred.promise;


        }

    }
}());
