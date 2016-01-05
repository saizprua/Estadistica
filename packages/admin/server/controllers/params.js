/**
 * Created by Julio on 31/12/15.
 */

'use strict';
var db = require('../../../../config/sequelize');
var async = require('async');

exports.getConfig = function (req, res) {
    db.config.findAll()
        .then(function (confs) {
            res.json(confs);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.roles = function(req,res){
    db.roles.findAll()
        .then(function (roles) {
            res.json(roles);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.updateConfig = function (req, res) {
    var ci = req.params.configId;

    async.series({
        query: function (done) {
            
            async.waterfall([

                function (done) {
                    db.config.find({
                            where:{id: ci}
                        })
                        .then(function (cnf) {
                            done(null,cnf);
                        })
                        .catch(done);
                },
                function (cnf,done) {
                    done(null);
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
    }, function (err, result) {

            if(err) return res.status(500).send(err);

            res.json(result.update);

    });




};