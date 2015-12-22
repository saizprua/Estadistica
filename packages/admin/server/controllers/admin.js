'use strict';

var config = require('../../../../config/config.js');
var db = require('../../../../config/sequelize');
var ir = config.ignoreRoutes;

module.exports = function (app) {

  return {
      routes: routes,
      getAcl: getAcl,
      save: save,
      update: update,
      destroy: destroy
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

    function save(req,res){

        req.body.metodos = req.body.metodos.toString();

        db.acl.create(req.body)
            .then(function () {
                res.json(req.body);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });

    }

    function update(req,res){
        req.body.metodos = req.body.metodos.toString();

        db.acl.update(req.body,{
            where:{id:req.params.aclId}
        })
            .then(function () {
                res.json(req.body);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function destroy(req, res){
        db.acl.destroy({
                where:{id: req.params.aclId}
            })
            .then(function () {
                res.json({success:true});
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }





};
