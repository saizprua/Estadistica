(function() {
  'use strict';

  angular
    .module('mean.iti')
    .run(runTemplate);

  function runTemplate(formlyConfig, DTDefaultOptions) {

    DTDefaultOptions.setLanguage({
          'sProcessing':     'Procesando...',
          'sLengthMenu':     'Mostrar _MENU_ registros',
          'sZeroRecords':    'No se encontraron resultados',
          'sEmptyTable':     'Ningún dato disponible en esta tabla',
          'sInfo':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
          'sInfoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
          'sInfoFiltered':   '(filtrado de un total de _MAX_ registros)',
          'sInfoPostFix':    '',
          'sSearch':         'Buscar:',
          'sUrl':            '',
          'sInfoThousands':  ',',
          'sLoadingRecords': 'Cargando...',
          'oPaginate': {
              'sFirst':    'Primero',
              'sLast':     'Último',
              'sNext':     'Siguiente',
              'sPrevious': 'Anterior'
          },
          'oAria': {
              'sSortAscending':  ': Activar para ordenar la columna de manera ascendente',
              'sSortDescending': ': Activar para ordenar la columna de manera descendente'
          }
      });




    formlyConfig.setType({
      name: 'datepicker',
      template:  '<div style="display:inline-block;"><uib-datepicker id="{{::id}}" max-date="datepicker.date" date-disabled="dataDisabled(date)"  min-mode="month" ng-model="model[options.key]"class="well well-sm mini-date"></uib-datepicker></div> ',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      controller: ['$scope', function ($scope) {
        console.log($scope);

        console.log($scope);
        $scope.datepicker = {};
        var date = new Date();
        $scope.datepicker.date = new Date( date.setMonth(date.getMonth()) );

        $scope.dataDisabled = function (date) {
          var data = $scope.to.data;
          date = date.setHours(0,0,0,0);

          var isFilter = data.filter(function (item) {
              var df = new Date(item.fecha_reporte).setHours(0,0,0,0);
              return (date === df && item.fecha_reporte !== $scope.model.fecha_reporte );
          })[0];

          return !!isFilter;
        };
      }]
    });
  }



}());
