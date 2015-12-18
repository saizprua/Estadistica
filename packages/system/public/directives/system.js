(function () {
    'use strict';
    angular.module('mean.system')
        .directive('sideNavigation', sideNavigation)
        .directive('minimalizaSidebar', minimalizaSidebar);

    function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function(){
                    element.metisMenu();

                });
            }
        };
    }
    function minimalizaSidebar() {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-info " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope) {
                $scope.minimalize = function () {
                    $('body').toggleClass('mini-navbar');
                    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        $('#side-menu').hide();
                        // For smoothly turn on menu
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 100);
                    } else if ($('body').hasClass('fixed-sidebar')){
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 300);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    }
}());