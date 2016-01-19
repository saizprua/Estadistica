(function(){
  'use strict';
  angular
      .module('mean.iti')
      .controller('ItiGController',ItiGController);

      ItiGController.inject = ['$http', '$filter', '$scope'];

      function ItiGController($http, $filter, $scope){

        var vm = this;
        var items = [{title:'Atentidos', key: 'atendidos'},{title:'Egresados',key: 'egresados'},{title:'Eventos', key: 'eventos'}];
        vm.model = [];
        vm.openDate = openDate;
        vm.isDisabled= isDisabled;
        vm.onChangeInput = onChangeInput;
        vm.colours = ['#03cb02', '#ff0000'];
        vm.colours2 = ['#329ECC', '#5A32CC'];
        vm.series = [];
        vm.labels = [];
        vm.seriesData = [];
        vm.options = {
            barValueSpacing : 20,
            tooltipFillColor: 'rgba(0,48,97,0.8)'
        };

        vm.labels = items.map(function(i){return i.title;});
        vm.keys =  items.map(function(i){return i.key;});


        init();

        function init() {
          vm.seriesData  = false;
          vm.series = false;
            getDataFecha();
            getDataYear();
        }

        function getDataFecha(){

            vm.seriesData  = false;
            vm.series = false;

          $http.get('api/iti' + (vm.model.length > 0 ? ('?dates=' + vm.model.toString()) : '?init=1') ).then(function (response) {
            vm.data = response.data;

             var fechas =  vm.data.map(function (item) {
                  var d = new Date(item.fecha_reporte).setHours(0,0,0,0);
                  return d;
              });
              vm.model = fechas;
            chartDinamic();
          },function(err){
            vm.err = err;
          });
        }

        function getDataYear(){
          $http.get('api/iti/year').then(function (response) {
            vm.dataYear = response.data;
            chartYear();
          },function(err){
            vm.err = err;
          });
        }

        function chartDinamic(){

          vm.seriesData = vm.data.map(function(m){return vm.keys.map(function (i){return m[i];});});
          vm.series = vm.data.map(function (i) {
            return $filter('capitalize')($filter('date')(i.fecha_reporte, 'MMMM yyyy'));
          });
        }

        function chartYear(){
          vm.seriesDataYear = vm.dataYear.map(function(m){return vm.keys.map(function (i){return m[i];});});
          vm.seriesYear = vm.dataYear.map(function (i) {
            return i.anio;
          });
        }


        function openDate(){
          vm.opened = true;
        }

        function insertDate(date){
          date = date.setHours(0,0,0,0);
          if(vm.model.indexOf(date) === -1){
            vm.model.push(date);
            onChangeInput();
          }
        }

        function isDisabled(date) {
          return vm.model.indexOf(date.setHours(0,0,0,0)) > -1;
        }

        function onChangeInput() {
            getDataFecha();
        }

        $scope.$watch('vm.dateSelect', function (n,o) {
          if(!!n && n !== o){
            insertDate(n);
          }
        });

      }

})();
