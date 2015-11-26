(function() {
  'use strict';

  angular
    .module('mean.iti')
    .run(runTemplate);

  function runTemplate(formlyConfig) {
    formlyConfig.setType({
      name: 'datepicker',
      template:  '<div style="display:inline-block;"><uib-datepicker id="{{::id}}" max-date="datepicker.date"  min-mode="month" ng-model="model[options.key]"class="well well-sm mini-date"></uib-datepicker></div> ',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      controller: ['$scope', function ($scope) {
        $scope.datepicker = {};
        var date = new Date();
        $scope.datepicker.date = new Date( date.setMonth(date.getMonth()) );
      }]
    });
  }



}());
