(function(){
  'use strict';
  angular
      .module('mean.iti')
      .controller('ItiController',ItiController);

      ItiController.inject = ['Iti','$uibModal', 'sAlert','SweetAlert', 'DTOptionsBuilder', '$filter', 'AclPermission'];

      function ItiController( Iti, $uibModal, sAlert, SweetAlert, DTOptionsBuilder, $filter, AclPermission){


        var vm = this;

          vm.opt =  DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'desc'])
              .withDisplayLength(12);


        getData();

          //metodos


          vm.allow  = AclPermission;
          vm.createOrEdit = createOrEdit;
          vm.destroy = destroy;
          vm.getData = getData;
          vm.isRefreshing = false;
          vm.refresh = refresh;


          //console.log(vm.allow('/api/iti', 'post'));

      function refresh() {
        vm.isRefreshing = true;
        vm[vm.select.method](true);
      }

      function getData(isRefresh){
        vm.select = {name:'data', as:'ItiCEAdminController',title:'Capacitaciones',method:'getData'};
          if(isRefresh || !vm.data){

            Iti.query().$promise.then(function (data) {
              vm.data = data;
              vm.isRefreshing = false;
            });
          }
        }

      function destroy(model) {

        sAlert({title:'Desea elminar el registro?', text:'Se eliminara el registro: ' + $filter('capitalize')($filter('date')(model.fecha_reporte, 'MMMM yyyy')) })
        .then(function () {
          model.$delete().then(function () {
              SweetAlert.swal('Confirmado!', 'Eliminado!', 'success');
              var index =  getIndexById(model.id);
              if(index >= 0 ) vm[vm.select.name].splice(index, 1);
          });

        });


      }

      function getIndexById(id,array){
        var index = -1;
        var data = array || vm[vm.select.name] || [];
        for (var i = 0; i < data.length; i++) {
          var parada = data[i];
          if(parada.id === id) {
            index = i;
            break;
          }
        }
        return index;
      }

      /**
       * [ Esta funcion permitera iniciar el modal para crear o editar el usuario de la aplicacion]
       * @method createOrEdit void
       * @param  {[object]}     model [modelo del usario @object]
       * @param  {[boolean]}     add   [indicara si el suario es nuevo]
       * @return {[void]}     [null]
       */
      function createOrEdit(model, add) {
        var result = $uibModal.open({
                windowClass: 'animated fadeIn',
                templateUrl: 'iti/views/templates/form.html',
                controller: vm.select.as,
                controllerAs: 'vm',
                size:'sm',
                resolve: {
                  formData: function() {
                    return {
                      model: model,
                      add : add,
                      title:vm.select.title,
                      data:vm.data
                    };
                  }
                }
           }).result;

           if (add) {
              result.then(function(model) {
                vm[vm.select.name].push(model);
              });
            }

         }
      }

})();
