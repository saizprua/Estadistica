(function () {
    'use strict';
    angular
        .module('mean.admin')
        .filter('metodos', function () {
            return filterMetodos;

            function filterMetodos(input){
               var metodos = {
                    'get': 'Leer',
                    'put': 'Editar',
                    'delete': 'Eliminar',
                    'post': 'Crear',
                    'download': 'Descargar'
                }

                return metodos[input];
            }
        })
        .filter('menus',function(){
            return  filterMenus;

            function filterMenus (arr,id){
                return arr.filter(function (itm) {
                   return !itm.path;
                });
            }
        })
        .filter('rutas',function(){

            return filterRutas;

            function filterRutas(rutas, rutasFilter){


               return rutas.filter(function (ruta) {
                    return  rutasFilter.indexOf(ruta.route.path) === -1;
                });

            }
        });
}());