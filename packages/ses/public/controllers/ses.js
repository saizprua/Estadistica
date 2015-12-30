(function() {
  'use strict';

    angular
      .module('mean.ses')
      .controller('SesController', SesController);

    SesController.$inject = ['SesChartService', '$http'];
    function SesController(SesChartService, $http) {
      var vm = this;
          vm.data = [];
          vm.years = [];

          vm.tipoSolicitudes = [
          {name:'Recibidas',key:'recibidas'},
          {name:'En Proceso', key:'enproceso'},
          {name:'Canceladas', key:'cancelado'},
          {name:'Concluídas', key:'concluido'}
        ];
          vm.config = {
            segmentStrokeWidth : 3,
            tooltipTemplate: '<%= value + "%" %>',
            tooltipFillColor: "rgba(0,48,97,0.8)"
          };

          vm.optC = {
            tooltipFillColor: "rgba(0,48,97,0.8)"
          };

          vm.getDataAll = getDataAll;

      init();

      function init() {
        getDataAll();
        createYearData();
        getSolictudes();
        getGenerales();
      }

      function createYearData(){
          var minYear = 2013;
          var currentYear = new Date().getFullYear();
          var maxYear = currentYear > minYear ? currentYear : 2015;

          for (var i = minYear; i <= maxYear; i++) {
            vm.years.push(i);
          }
      }

      function getGenerales() {
        $http.get('api/ses/generales').then(function (response) {
          vm.generales = response.data;
        },function (err) {
          vm.err = err;
        });
      }

      function getDataAll(){
        console.log(vm.year);
        SesChartService.all({year:vm.year}).then(function (data) {
          vm.data = data;
        });
      }

      function getSolictudes(){
        $http.get('api/ses/solicitudes').then(function (response) {
          var data = response.data;
          vm.solicitudes = data;
          vm.keys =  vm.tipoSolicitudes.map(function(i){return i.name;});
          vm.keyFix = vm.tipoSolicitudes.map(function (i) {
            return data.map(function (e) { return e[i.key]; });
          });
          vm.dataFix = data.map(function (i) {
            return vm.tipoSolicitudes.map(function (e) { return i[e.key]; });
          });
          vm.yearsSol = data.map(function (i) { return i.year; });



        },function (err) {
          vm.err =err;
        });
      }

    }
}());
