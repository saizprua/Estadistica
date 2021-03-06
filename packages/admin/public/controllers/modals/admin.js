(function() {
    'use strict';
    angular
        .module('mean.admin')
        .controller('AdminCEAdminController', AdminCEAdminController);

    AdminCEAdminController.$inject = ['$uibModalInstance', 'formData','ACL','sAlert','SweetAlert','$http'];
    function AdminCEAdminController($uibModalInstance, formData, ACL,sAlert, SweetAlert,$http) {
        var vm = this;
        vm.model = angular.copy(formData.model);

        if(!formData.add) {
            var model = vm.model.metodos.split(',');
            vm.model.metodos = model;
        }


        vm.errors = [];
        init();

        vm.onSubmit = onSubmit;
        vm.cancel = cancel;

        vm.formData = formData;
        vm.originalFields = angular.copy(vm.formData.fields);

        function init(){
            $http.get('api/routes/all').then(function (response) {
                vm.routes = response.data;
                vm.options = getMethods(vm.model.ruta);
            });
        }

        function onSubmit(){
            vm.errors = [];
            vm.form.$submitted = true;

            if(vm.form.$invalid){
                vm.errors.push({title:'Invalid Form!'});
                return;
            }

            if(!formData.add){

                sAlert({title:'Desea modificar el registro?', text:'Se modificara el registro ID: ' + formData.model.id})
                    .then(function () {
                        vm.model.$update().then(function (empresa) {
                            SweetAlert.swal('Confirmado!', 'Cambios guardados!', 'success');
                            angular.extend(formData.model, empresa);
                            vm.cancel();
                        },function (err) {
                            vm.errors.push(err.data || err);
                        });
                    });


            }else {
                sAlert({title:'Desea agregar un nuevo registro?', text:'Se se agregara un nuevo registro'})
                    .then(function () {
                        var empresa = new ACL(vm.model);

                        empresa.$save().then(function(empresa) {
                            SweetAlert.swal('Confirmado!', 'Nuevo registro guardado!', 'success');
                            $uibModalInstance.close(empresa);
                        },function (err) {
                            vm.errors.push(err.data || err);
                        });
                    });


            }

        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }


        vm.fields = [
            {
                key: 'role_id',
                type: 'select',
                templateOptions: {
                    label: 'Rol',
                    required: true,
                    options: formData.roles,
                    ngOptions: 'opt.id as opt.rol  for opt in to.options'
                }
            },
            {
                key: 'ruta',
                type: 'select',
                templateOptions: {
                    required: true,
                    label: 'API',
                    options: [],
                    ngOptions: 'opt.route.path as opt.route.path  for opt in to.options  | rutas:rutaLoad'
                },
                expressionProperties: {
                    'templateOptions.disabled': '!model.role_id'
                },
                controller:  function($scope) {

                    var data = formData.data;
                    $scope.rutaLoad = [];

                    $scope.$watch('model.role_id', function (newValue) {
                        if(newValue){
                            $scope.rutaLoad = data
                                .filter(function (ruta) {
                                    return ruta.role_id  ===  parseInt(newValue) && formData.model.ruta !== ruta.ruta;
                                })
                                .map(function (ruta) { return ruta.ruta; });
                        }
                    });


                    $scope.$watch(function () { return vm.routes; }, function (n) {
                        if(n){
                            $scope.to.options = n;
                        }
                    });
                }
            },
            {
                key: 'metodos',
                type: 'ui-select-multiple',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    label: 'Tipo Permiso',
                    valueProp: 'id',
                    labelProp: 'label',
                    placeholder: 'Select options',
                    options:  []
                },
                expressionProperties: {
                    'templateOptions.disabled': '!model.ruta'
                },
                controller:function($scope){


                    $scope.$watch(function () {return  vm.options;}, function (n) {
                        if(n){
                            $scope.to.options = n;
                        }
                    });

                    $scope.$watch('model.ruta', function (newValue, oldValue) {
                        if(newValue !== oldValue) {
                            // logic to reload this select's options asynchronusly based on state's value (newValue)
                            if(!oldValue) {
                                // reset this select
                                $scope.model[$scope.options.key] = null;
                                $scope.to.options = [];
                            }
                            var mtos = getMethods(newValue);
                            // Reload options
                            $scope.model[$scope.options.key] = mtos;
                            $scope.to.options = mtos;
                        }
                    });
                }
            }

        ];


        function getMethods(path){

            var result = [];
            var filter = vm.routes.filter(function (i) {
                return i.route.path === path;
            });

            if(filter.length === 0) return result;

            for(var mets in filter[0].route.methods){
                if(mets !== '_all') result.push(mets);
            }

            return result;
        }
    }
}());
