/**
 * Created by Julio on 31/12/15.
 */

'use strict';
var db = require('../../../../config/sequelize');

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
}

exports.updateConfig = function (req, res) {
    var ci = req.params.configId;
    db.config.update({
        value_item: req.body.value_item
    },{
        where:{
            id:ci
        }
    })
        .then(function () {
            res.json(req.body);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};