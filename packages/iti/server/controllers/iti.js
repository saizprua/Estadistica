'use strict';

var db = require('../../../../config/sequelize');

exports.all = function (req, res) {

  db.iti.findAll()
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.status(500).send(err);
  });

};


exports.create = function (req,res) {

  req.body.user_id = req.user.id;

  var iti = db.iti.build(req.body);
      iti.save().then(function () {
        res.json(iti);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
};

exports.delete = function (req, res) {
  db.iti.destroy({
    where:{id: req.params.itiId}
  })
  .then(function () {
    res.json({success:true});
  })
  .catch(function (err) {
    res.status(500).send(err);
  });
};



exports.update = function (req,res) {
  req.body.user_id = req.user.id;
  var id  = req.params.itiId;

  db.iti.update(req.body,{
    where:{id:id}
  }).then(function () {
    res.json(req.body);
  })
  .catch(function (err) {
    res.status(500).send(err);
  });

};
