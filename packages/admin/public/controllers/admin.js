(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['ACL','Params', 'Roles' ,'$uibModal', 'sAlert', 'SweetAlert', 'editableOptions'];

    function AdminController(ACL, Params, Roles,  $uibModal, sAlert, SweetAlert, editableOptions) {
        var vm = this;
        editableOptions.theme = 'bs3';

        //metodos
        vm.createOrEdit = createOrEdit;
        vm.destroy = destroy;
        vm.isRefreshing = false;
        vm.refresh = refresh;
        vm.onBeforeSaveParams = onBeforeSaveParams;
        vm.updateRole = updateRole;
        vm.destroyRole = destroyRole;

        //call method init
        init();


        function onBeforeSaveParams(data, param){

            var com = param.value_item;

            param.value_item = data;
            var up = param.$update();

            up.then(
                function () {  console.log('ok');},
                function () {  param.value_item = com;}
            );

           return up;
        }

        //method init
        function init() {
            getRoles();

            ACL.query().$promise.then(function (data) {
                vm.data = data;
            }, function (err) {
                vm.err = err;
            });

            Params.query().$promise.then(function (params) {
                vm.params = params;
            }, function (err) {
                vm.err = err;
            });
        }



        function  updateRole(data, rol){
            var com = rol.rol;

            rol.rol = data;
            var up = rol.$update();

            up.then(
                function () {  console.log('ok');},
                function () {  rol.rol = com;}
            );

            return up;
        }


        function getRoles(){
            Roles.query().$promise.then(function (data) {
                vm.roles = data;
            }, function (err) {
                vm.err = err;
            });
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


        function destroyRole(model) {

            sAlert({title:'Desea elminar el registro?', text:'Se eliminara el ROL : ' + model.rol})
                .then(function () {
                    model.$delete().then(function () {
                        SweetAlert.swal('Confirmado!', 'Eliminado!', 'success');
                        var index =  getIndexById(model.id,vm.roles);
                        if(index >= 0 ) vm.roles.splice(index, 1);
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