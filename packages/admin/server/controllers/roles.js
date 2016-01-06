/**
 * Created by Julio on 6/1/16.
 */
'use strict';

var db = require('../../../../config/sequelize');

exports.update = function (req, res) {
    db.roles.update({
        rol: req.body.rol
    },{where:{
        id: req.body.id
    }})
        .then(function () {
            res.json(req.body);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.destroy = function (req, res) {

    if(!req.query.roleId) return res.status(404).send('El parametro de carga no es correcto');

    db.roles.destroy({
        where:{
            id: req.query.roleId
        }
    })
        .then(function () {
            res.json({success:true});
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};


exports.save = function (req, res) {

    db.roles.create(req.body)
        .then(function (role) {
            res.json(role);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.query = function(req,res){
    db.roles.findAll()
        .then(function (roles) {
            res.json(roles);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};