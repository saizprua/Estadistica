(function() {
  'use strict';
    angular
      .module('mean.ses')
      .factory('SesChartService', SesChartService);

    function SesChartService($http, $q) {
      var colors = ['#1ca1be','#3f51b5','#4300ff', '#ffa100', '#3b6eef', '#e2517d','#ffe900','#36d157','#6100ff', '#18bc9c','#b7b7b7'];
      var service = {
        all: all
      };

      return service;

      function all(params) {
        var year = params.year ? '?year='+params.year : '';
        var deferred = $q.defer();
            $http.get('api/ses/all' + year).then(function (data) {
              var dataForm = generateData(data.data);
              deferred.resolve(dataForm);
            },function (err) {
              deferred.reject(err);
            });

          return  deferred.promise;
      }

      function generateData(data,config) {
        config = angular.extend({value:'monto', label:'entidad.nombre_entidad'});
        var result = {values:[], labels:[], montos:[], colors: colors, data:data, sum:0};

        result.sum = data.reduce(function(p, c) {
            return (p.monto ? p.monto : p) + c.monto;
        });

        data.forEach(function (item) {
              var objData = {};
              for (var name in config) {
                if (config.hasOwnProperty(name)) {
                  var split = config[name].split('.');

                  for (var i = 0; i < split.length; i++) {
                      var attr = split[i];
                      if(item[attr] && i === 0){
                        objData[name] = item[attr];
                      }
                      else if(objData[name] && objData[name][attr] && i > 0){
                        objData[name] = objData[name][attr];
                      }
                      else {
                        objData[name] = attr;
                      }
                  }
                }
              }

              if( objData.value.toFixed){
                  result.values.push( ((objData.value / result.sum)*100).toFixed(2) );
                  result.montos.push( objData.value.toFixed(2) );
                  result.labels.push( objData.label );
              }

        });

        return result;
      }

    }
}());
