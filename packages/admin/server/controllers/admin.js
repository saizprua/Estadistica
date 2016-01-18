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
      destroy: destroy,
      getAclRoles: getAclRoles

  };


    function  routes (req, res) {
        var paths = app._router.stack;
        paths = paths.filter(function (e) {
        return (e.name === 'bound dispatch' &&  ir.indexOf(e.route.path) === -1 && e.route.methods._all);
        });
        res.json(paths);
    }

    function getAcl(req, res){
        db.acl.findAll({
                include: [{model: db.roles}]
        })
            .then(function (acl) {
                 res.json(acl);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }


    function getAclRoles(req, res){

        var roles = req.user.roles.split(',');
        db.acl.findAll({
            attributes:['ruta', 'metodos'],
            include:[{
                attributes:['rol'],
                model: db.roles,
                where:{ rol: {$in:roles} }
            }]
        })
            .then(function (data) {
                res.json(data);
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

                    db.acl.findOne({
                        transaction: t,
                        include: [{model: db.roles}],
                        where: {id: acl_.id}
                    })
                        .then(function (_acl) {
                            acl.acl.allow(_acl.role.rol, acl_.ruta, acl_.metodos.split(','), function (err) {
                                if(err) return deferred.reject(err);
                                //resolve promisers
                                deferred.resolve(_acl);
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

    function update(req,res){

        var body = req.body;
        body.metodos = body.metodos.toString();



        db.sequelize.transaction(function (t) {
            var deferred = when.defer();

                 db.acl.update(body,{
                     where:{id:req.body.id},
                     transaction: t
                })
                .then(function () {

                    db.acl.findOne({
                        transaction: t,
                        include: [{model: db.roles}],
                        where: {id: req.body.id}
                    })
                        .then(function(_acl){
                            acl.acl.removeAllow(_acl.role.rol, body.ruta, function (err) {
                                if(err) return deferred.reject(err);

                                acl.acl.allow(_acl.role.rol, body.ruta, body.metodos.split(','), function (err) {
                                    if(err) return deferred.reject(err);

                                    //resolve promisers
                                    deferred.resolve(_acl);
                                });
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


    //cuando se elimina la politica de acl para el resoruce de rol
    function destroy(req, res){

        var aclId = req.query.aclId;

        if(!aclId) return res.status(404).send('Parametro invalido!');


        db.sequelize.transaction(function (t) {
          var deferred = when.defer();

          db.acl.find({
              where: {id: aclId},
              include: [{model: db.roles}],
          })
              .then(function (acl_) {

                  db.acl.destroy({
                          where:{id: aclId},
                          transaction: t
                      })
                      .then(function () {

                          acl.acl.removeAllow(acl_.role.rol, acl_.ruta, function (err) {
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
