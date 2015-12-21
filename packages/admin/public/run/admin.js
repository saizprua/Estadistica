(function () {
    'use strict';

    angular
        .module('mean.admin')
        .run(run);

    function run(formlyConfig){

        // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
        formlyConfig.extras.removeChromeAutoComplete = true;

        formlyConfig.setType({
            name: 'ui-select-multiple',
            extends: 'select',
            templateUrl: 'admin/views/templates/mutiple-select.html'
        });

    }
}());

  