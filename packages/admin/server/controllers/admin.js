'use strict';

var config = require('../../../../config/config.js');
var db = require('../../../../config/sequelize');
var acl = require('../../../../config/acl');
var ir = config.ignoreRoutes;
var when = require('when');

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
        var body  = req.body;
        body.metodos = body.metodos.toString();

        db.sequelize.transaction(function (t) {
            var deferred = when.defer();

            db.acl.create(body,{
                    transaction: t
                })
                .then(function (acl_) {

                        acl.acl.allow(acl_.role, acl_.ruta, acl_.metodos.split(','), function (err) {
                            if(err) return deferred.reject(err);
                            //resolve promisers
                            deferred.resolve(body);
                        });
                })
                .catch(deferred.reject);

            return deferred.promise;

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            res.json(result);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
            res.status(500).send(err);
        });

    }

    function update(req,res){

        var body = req.body;
        body.metodos = body.metodos.toString();



        db.sequelize.transaction(function (t) {
            var deferred = when.defer();

                 db.acl.update(body,{
                     where:{id:req.params.aclId},
                     transaction: t
                })
                .then(function () {

                    acl.acl.removeAllow(body.role, body.ruta, function (err) {
                        if(err) return deferred.reject(err);

                        acl.acl.allow(body.role, body.ruta, body.metodos.split(','), function (err) {
                            if(err) return deferred.reject(err);

                            //resolve promisers
                            deferred.resolve(body);
                        });
                    });

                })
                .catch(deferred.reject);

            return deferred.promise;

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
            res.json(result);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
            res.status(500).send(err);
        });
    }


    //cuando se elimina la politica de acl para el resoruce de rol
    function destroy(req, res){

        db.sequelize.transaction(function (t) {
          var deferred = when.defer();

          db.acl.find({
              where: {id: req.params.aclId}
          })
              .then(function (acl_) {

                  db.acl.destroy({
                          where:{id: req.params.aclId},
                          transaction: t
                      })
                      .then(function () {
                          acl.acl.removeAllow(acl_.role, acl_.ruta, function (err) {
                              if(err) return deferred.reject(err);
                              deferred.resolve({success:true});

                          });
                      })
                      .catch(deferred.reject);

              })
              .catch(deferred.reject);


          return deferred.promise;

        }).then(function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
          res.json(result);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
          res.status(500).send(err);
        });

    }





};
