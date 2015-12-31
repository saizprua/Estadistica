(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['ACL','Params' ,'$uibModal', 'sAlert', 'SweetAlert', 'editableOptions','$q'];

    function AdminController(ACL, Params, $uibModal, sAlert, SweetAlert, editableOptions, $q) {
        var vm = this;
        editableOptions.theme = 'bs3';

        //metodos
        vm.createOrEdit = createOrEdit;
        vm.destroy = destroy;
        vm.isRefreshing = false;
        vm.refresh = refresh;
        vm.onBeforeSaveParams = onBeforeSaveParams;

        //call method init
        init();


        function onBeforeSaveParams(data, param){
           console.log(data, param);
        }

        //method init
        function init() {
            ACL.query().$promise.then(function (data) {
                vm.data = data;
            }, function (err) {
                vm.err = err;
            });

            Params.query().$promise.then(function (params) {
                vm.params = params;
            }, function (err) {
                vm.err = err;
            })
        }

        //function refresh
        function refresh() {
            vm.isRefreshing = true;
        }

        //function destroy
        function destroy(model) {

            sAlert({title:'Desea elminar el registro?', text:'Se eliminara el registro ID: ' + model.id})
                .then(function () {
                    model.$delete().then(function () {
                        SweetAlert.swal('Confirmado!', 'Eliminado!', 'success');
                        var index =  getIndexById(model.id);
                        if(index >= 0 ) vm.data.splice(index, 1);
                    });

                });


        }

        //function getIndexById
        function getIndexById(id,array){
            var index = -1;
            var data = array || vm.data || [];
            for (var i = 0; i < data.length; i++) {
                var model = data[i];
                if(model.id === id) {
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
                templateUrl: 'admin/views/templates/admin.html',
                controller: 'AdminCEAdminController',
                controllerAs: 'vm',
                resolve: {
                    formData: function() {
                        return {
                            model: model,
                            add : add,
                            title:'ACL',
                            data:vm.data
                        };
                    }
                }
            }).result;

            if (add) {
                result.then(function(model) {
                    vm.data.push(model);
                });
            }

        }


    }
}());