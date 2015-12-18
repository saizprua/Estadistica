'use strict';

var config = require('../../../../config/config.js');
var ir = config.ignoreRoutes;

module.exports = function (app) {

  return {routes: routes};

  function  routes (req, res) {
    var paths = app._router.stack;
    paths = paths.filter(function (e) {
      return (e.name === 'bound dispatch' &&  ir.indexOf(e.route.path) === -1);
    });
    res.json(paths);
  }

};
