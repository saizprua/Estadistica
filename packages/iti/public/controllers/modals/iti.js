(function() {
  'use strict';
  angular
    .module('mean.iti')
    .controller('ItiCEAdminController', ItiCEAdminController);

  ItiCEAdminController.$inject = ['$uibModalInstance', 'formData','Iti','sAlert','SweetAlert'];
    function ItiCEAdminController($uibModalInstance, formData, Iti,sAlert, SweetAlert) {
      var vm = this;
          vm.model = angular.copy(formData.model);
          vm.errors = [];

          vm.onSubmit = onSubmit;
          vm.cancel = cancel;

          vm.formData = formData;
          vm.originalFields = angular.copy(vm.formData.fields);


          function onSubmit(){
              vm.errors = [];
              vm.form.$submitted = true;

              if(vm.form.$invalid){
                  //vm.errors.push({title:'Invalid Form!'});
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
                      err = err.data && err.data.message|| err.message || err;
                      SweetAlert.swal('ERROR!', err, 'error');
                      vm.errors.push(err.data || err);
                  });
                });


              }else {
                sAlert({title:'Desea agregar un nuevo registro?', text:'Se se agregara un nuevo registro'})
                .then(function () {
                  var empresa = new Iti(vm.model);

                    empresa.$save().then(function(empresa) {
                      SweetAlert.swal('Confirmado!', 'Nuevo registro guardado!', 'success');
                      $uibModalInstance.close(empresa);
                    },function (err) {
                        err = err.data && err.data.message|| err.message || err;
                        SweetAlert.swal('ERROR!', err, 'error');
                        vm.errors.push(err.data || err);
                    });
                });
              }
          }

           function cancel() {
             $uibModalInstance.dismiss('cancel');
           }

           function negative($viewValue, $modelValue) {
             var value = $viewValue || $modelValue;
              if(value && value < 0){
                 throw new Error('Validacion Error');
              }
              return true;
           }

            vm.fields = [
              {
                key: 'atendidos',
                type: 'input',
                className: 'form-sm',
                templateOptions: {
                  label: 'Atendidos',
                  maxlength: 11,
                  type: 'number',
                  placeholder: 'Atendidos',
                  required: true
                },
                validators:{
                  negative:negative
                }
              },
              {
                key: 'egresados',
                type: 'input',
                className: 'form-sm',
                templateOptions: {
                  label: 'Egresados',
                  maxlength: 11,
                  type: 'number',
                  placeholder: 'Egresados',
                  required: true
                },
                expressionProperties: {
                 'templateOptions.disabled': '!model.atendidos'
               },
                validators:{
                  negative:negative,
                  menor: 'model.atendidos >= $viewValue'
                }
              },
              {
                key: 'eventos',
                type: 'input',
                className: 'form-sm',
                templateOptions: {
                  label: 'Eventos',
                  maxlength: 11,
                  type: 'number',
                  placeholder: 'Eventos',
                  required: true
                },
                expressionProperties: {
                 'templateOptions.disabled': '!model.egresados'
               },
                validators:{
                  negative:negative,
                  menor: 'model.egresados > $viewValue || model.atendidos > $viewValue'
                }
              },
              {
                 key: 'fecha_reporte',
                 type: 'datepicker',
                 templateOptions: {
                   label: 'Mes',
                   required:true,
                   data: formData.data
                }
               }

        ];
    }
}());
