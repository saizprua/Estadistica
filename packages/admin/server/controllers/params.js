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