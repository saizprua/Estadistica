(function() {
  'use strict';

    angular
      .module('mean.ses')
      .controller('SesController', SesController);

    SesController.$inject = ['SesChartService'];
    function SesController(SesChartService) {
      var vm = this;
          vm.data = [];
          vm.years = [];
          vm.config = {
            segmentStrokeWidth : 3,
            tooltipTemplate: '<%= value + "%" %>'
          };
          vm.getDataAll = getDataAll;

      init();

      function init() {
        getDataAll();
        createYearData();
      }



      function createYearData(){
          var minYear = 2013;
          var currentYear = new Date().getFullYear();
          var maxYear = currentYear > minYear ? currentYear : 2015;

          for (var i = minYear; i <= maxYear; i++) {
            vm.years.push(i);
          }
      }


      function getDataAll(){
        console.log(vm.year);
        SesChartService.all({year:vm.year}).then(function (data) {
          vm.data = data;
        });
      }


    }
}());
