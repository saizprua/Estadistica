'use strict';
var db = require('../../../../config/sequelize');

exports.query = function (req, res) {
    db.menu.findAll({})
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });

};

exports.update = function (req, res) {
    var body = req.body;
    if(!body.is_child) {
        body.parent_id = null;
        body.path = null;
    }
  db.menu.update(body,{
      where:{id: body.id}
  })
      .then(function () {
          res.json(body);
      })
      .catch(function (err) {
          res.status(500).send(err);
      });
};


exports.delete = function (req, res) {
    db.menu.destroy({where:{id: req.query.menuId}})
        .then(function () {
            res.json({success:true})
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.save = function (req, res) {
    var body = req.body;
    if(!body.is_child) {
        body.parent_id = null;
        body.path = null;
    }

    db.menu.create(body)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};