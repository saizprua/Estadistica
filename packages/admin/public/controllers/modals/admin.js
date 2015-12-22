(function() {
    'use strict';
    angular
        .module('mean.admin')
        .controller('AdminCEAdminController', AdminCEAdminController);

    AdminCEAdminController.$inject = ['$uibModalInstance', 'formData','ACL','sAlert','SweetAlert','$http'];
    function AdminCEAdminController($uibModalInstance, formData, ACL,sAlert, SweetAlert,$http) {
        var vm = this;
        vm.model = angular.copy(formData.model);

        if(!formData.add) vm.model.metodos = vm.model.metodos.split(',');


        vm.errors = [];
        init();

        vm.onSubmit = onSubmit;
        vm.cancel = cancel;

        vm.formData = formData;
        vm.originalFields = angular.copy(vm.formData.fields);

        function init(){
            $http.get('api/routes/all').then(function (response) {
                vm.routes = response.data;
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
                key: 'role',
                type: 'input',
                templateOptions: {
                    label: 'Nombre del Rol',
                    maxlength: 20,
                    type: 'text',
                    placeholder: 'Nombre del Rol',
                    required: true
                }
            },
            {
                key: 'ruta',
                type: 'select',
                templateOptions: {
                    required: true,
                    label: 'Ruta',
                    options: [],
                    ngOptions: 'opt.route.path as opt.route.path  for opt in to.options'
                },
                controller:  function($scope) {
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
                    label: 'Multiple Select',
                    valueProp: 'id',
                    labelProp: 'label',
                    placeholder: 'Select options',
                    options: []
                },
                controller:function($scope){
                    $scope.$watch('model.ruta', function (newValue, oldValue) {
                        console.log(newValue,oldValue);
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
