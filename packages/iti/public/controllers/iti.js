(function(){
  'use strict';
  angular
      .module('mean.iti')
      .controller('ItiController',ItiController);

      ItiController.inject = ['Iti','$uibModal', 'DTDefaultOptions'];

      function ItiController( Iti, $uibModal, DTDefaultOptions){

        //default lang
        DTDefaultOptions.setLanguage({
            sUrl: 'iti/assets/json/es_dt.json'
        });
        // console.log(DTOptionsBuilder);
        //iti/assets/json/es_dt.json
        var vm = this;

        getData();
          //metodos
          vm.createOrEdit = createOrEdit;
          vm.destroy = destroy;
          vm.getData = getData;
          vm.isRefreshing = false;
          vm.refresh = refresh;




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
        model.$delete();
        var index =  getIndexById(model.id);
        if(index >= 0 ) vm[vm.select.name].splice(index, 1);
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
                      title:vm.select.title
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
