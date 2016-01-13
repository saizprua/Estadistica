(function () {
    'use strict';

    angular
        .module('mean.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['ACL','Params', 'MenuList', 'Roles' ,'$uibModal', 'sAlert', 'SweetAlert', 'editableOptions'];

    function AdminController(ACL, Params, MenuList, Roles,  $uibModal, sAlert, SweetAlert, editableOptions) {
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
        vm.createRole = createRole;
        vm.getParent = getParent;
        vm.saveMenu = saveMenu;
        vm.destroyMenu = destroyMenu;
        vm.newMenu = newMenu;
        vm.cancelMenu  = cancelMenu;
        vm.nRole = {};
        vm.createRol = false;

        //call method init
        init();



        //method init
        function init() {
            getRoles();
            getMenu();

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

        function cancelMenu(form, model, index){
            if(!model.id){
                vm.menu.splice(index, 1);
            }
            form.$cancel();
        }

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

        function newMenu(){
         var ins =  vm.insertedMenu =  new MenuList({
               name: null,
               parent_id: null,
               path: null,
               is_child: false
           });
            vm.menu.push(ins);
        }

        function destroyMenu(model, index){

            if(model.id) index = getIndexById(model.id,  vm.menu);
            model.$delete().then(function () {
                vm.menu.splice(index, 1);
            });
        }

        function saveMenu(data, model){

           var cd = angular.copy(model);
            angular.extend(model, data);

            var save ;

            if(!model.id) save = model.$save(model);
            else save = model.$update();

            save = save;

            save.then(function () {
                console.log('ok');
            }, function () {
                angular.extend(model, cd);
            });
            return save;
        }

        function getParent(parent){
            var res = 'Principal';
            if(!parent) return res;

            for(var i=0; i < vm.menu.length; i++){
                var item = vm.menu[i];
                if(item.id === parent){
                    res = item.name;
                    break;
                }
            }

            return res;

            //return vm.menu.filter(function (item) {
            //    return item.id = parent;
            //})[0].name;
        }

        function getMenu(){
            MenuList.query().$promise
                .then(function (menu) {
                    vm.menu = menu;
                }, function (err) {
                    vm.err = err;
                });
        }


        function createRole(){
            if(vm.nRole.rol){
             var role =   new Roles(vm.nRole);
                role.$save().then(function (result) {
                    vm.roles.push(result);
                    vm.createRol = false;
                    vm.nRole = {};
                }, function (err) {
                    vm.err = err;
                });
            }
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
                            data:vm.data,
                            roles: vm.roles
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