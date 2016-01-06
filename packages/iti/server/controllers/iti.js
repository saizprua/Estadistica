'use strict';

var db = require('../../../../config/sequelize');
var sequelize = require('sequelize');
var async = require('async');


exports.year = function (req,res) {

  db.iti.findAll({
    attributes: [
         [sequelize.fn('YEAR', sequelize.col('fecha_reporte')), 'anio'],
         [sequelize.fn('SUM', sequelize.col('atendidos')), 'atendidos'],
         [sequelize.fn('SUM', sequelize.col('egresados')), 'egresados'],
         [sequelize.fn('SUM', sequelize.col('eventos')), 'eventos']
      ],
     group: [ sequelize.fn('YEAR', sequelize.col('fecha_reporte'))]
  })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.status(500).send(err);
  });

};



exports.all = function (req, res) {

  var dates = req.query.dates;
  var where = {};

  function setWhere(data){
    where.where = { fecha_reporte:{ $in:data }};
  }

  async.series(
    [
      function(done){

        if(!!dates){
          var nDates = [];
          dates =  dates.split(',');
          dates.forEach(function (item) {
            var pItem = parseInt(item);
            if(pItem){  nDates.push( new Date(pItem) );  }
          });
          setWhere(nDates);
          done(null);
        }else if(!!req.query.init){
          db.iti.max('fecha_reporte')
          .then( function (max) {
            if(!max) done(null);
            else{
              var lastYear = new Date(max);
                  lastYear.setFullYear(lastYear.getFullYear() - 1);
                setWhere([lastYear,max]);
                done(null);
            }
            return null;
          }).catch(done);

        }else{
          done(null);
        }

      }
    ],
    function (err) {
      if(err) return res.status(500).send(err);

      db.iti.findAll(where)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });

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

  var  itiId = req.query.itiId;
  if(!itiId) return res.status(404).send('Parametro invalido!');

  db.iti.destroy({
    where:{id: itiId}
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
  var id  = req.body.id;

  if(!id) return res.status(404).send('Parametro invalido!');

  db.iti.update(req.body,{
    where:{id:id}
  }).then(function () {
    res.json(req.body);
  })
  .catch(function (err) {
    res.status(500).send(err);
  });

};
