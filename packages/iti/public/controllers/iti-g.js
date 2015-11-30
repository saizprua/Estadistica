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
        vm.colours = ['#18bc9c','#3f51b5'];
        vm.series = [];
        vm.labels = [];
        vm.seriesData = [];
        vm.options = {barValueSpacing : 20};

        var today = new Date().setDate(1);
            today = new Date(today).setHours(0,0,0,0);

        var todayLast = new Date(today);
            todayLast = todayLast.setFullYear(todayLast.getFullYear() - 1);

            vm.model.push(today);
            vm.model.push(todayLast);

        init();

        function init() {

          $http.get('api/iti' + (vm.model.length > 0 ? ('?dates=' + vm.model.toString()) : '') ).then(function (response) {
            vm.data = response.data;
            vm.labels = items.map(function(i){return i.title;});

            var keys =  items.map(function(i){return i.key;});

            vm.seriesData = vm.data.map(function(m){return keys.map(function (i){return m[i];});});

            vm.series = vm.data.map(function (i) {
              return $filter('capitalize')($filter('date')(i.fecha_reporte, 'MMMM yyyy'));
            });
          },function(err){
            vm.err = err;
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
          init();
        }

        $scope.$watch('vm.dateSelect', function (n,o) {
          if(!!n && n !== o){
            insertDate(n);
          }
        });

      }

})();
