/**
 * Created by Julio on 31/12/15.
 */

'use strict';
var db = require('../../../../config/sequelize');
var Acl = require('../../../../config/acl');
var config = require('../../../../config/config.js');
var async = require('async');

exports.query = function (req, res) {
    db.config.findAll()
        .then(function (confs) {
            if(!confs.length){
              db.config.create({ config_item: 'adminRole', value_item: config.adminRole})
                  .then(function (conf) {

                      console.log(conf);
                      res.json(conf);
                  })
                  .catch(function (err) {
                      res.status(500).send(err);
                  });
            }else{
                res.json(confs);
            }

        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};


exports.update = function (req, res) {

    var ci = req.query.configId;

    if(!ci) return res.status(404).send('Parametro invalido');

    async.series({
            query: function (done) {
                async.waterfall([
                    function (done) {
                        db.config.find({where:{id: ci}})
                            .then(function (cnf) {done(null,cnf);})
                            .catch(done);
                    },
                    function (cnf,done) {
                        if(cnf.config_item === 'adminRole'){
                            async.each(cnf.value_item.split(',') , function (role, nxt) {
                                Acl.acl.removeRole(role.trim(), nxt);
                            }, function (err) {
                                if(err) return done(err);

                                var newRoles = req.body.value_item.split(',').map(function (role) {
                                    return role.trim();
                                });

                                Acl.acl.allow([{
                                    roles: newRoles,
                                    allows: [{
                                        resources:Acl.routes,
                                        permissions: '*'
                                    }]

                                }]);

                                config.adminRole = newRoles.toString();
                                done(null);
                            });
                            done(null);

                        }else{
                            done(null);
                        }
                    }

                ], done);

            },

            update: function (done) {
            db.config.update({
                    value_item: req.body.value_item
                },{
                    where:{ id:ci}
                })
                .then(function () {
                    done(null, req.body);
                })
                .catch(done);
        }
    },
        function (err, result) {

            if(err) return res.status(500).send(err);

            res.json(result.update);

    });




};