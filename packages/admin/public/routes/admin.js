(function () {
    'use strict';
    angular
        .module('mean.admin')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider.state('admin',{
            url:'/admin/config',
            templateUrl:'admin/views/index.html',
            data: { pageTitle: 'Admin' },
            controller:'AdminController',
            controllerAs: 'vm',
            resolve:{
                loggedin: function(MeanUser) {
                    return MeanUser.checkLoggedin();
                },
                loadPlugin: function ($ocLazyLoad) {
                    return  $ocLazyLoad.load([
                        {
                            serie: true,
                            files: [
                                'bower_components/datatables/media/css/dataTables.bootstrap.min.css',
                                'bower_components/datatables/media/js/dataTables.bootstrap.min.js'
                            ]
                        }
                    ]).then(function () {
                        console.log('success');
                    },function (err) {
                        console.log(err);
                    });
                }
            }
        });
    }


}());