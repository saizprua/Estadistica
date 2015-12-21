'use strict';

var config = require('../../../../config/config.js');
var db = require('../../../../config/sequelize');
var ir = config.ignoreRoutes;

module.exports = function (app) {

  return {
      routes: routes,
      getAcl: getAcl
  };


    function  routes (req, res) {
        var paths = app._router.stack;
        paths = paths.filter(function (e) {
        return (e.name === 'bound dispatch' &&  ir.indexOf(e.route.path) === -1);
        });
        res.json(paths);
    }

    function getAcl(req, res){
        db.acl.findAll()
            .then(function (acl) {
                 res.json(acl);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }





};