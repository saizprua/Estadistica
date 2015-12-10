'use strict';

var db = require('../../../../config/sequelize');
var sequelize = require('sequelize');
var async = require('async');

exports.generales = function (req, res) {

 async.series({
   instituciones:function (done) {
     db.entidad.count()
     .then(function (count) {
       done(null,count);
       return null;
     })
     .catch(done);
   },
   usuarios:function (done) {
     db.usuarios.count()
     .then(function (count) {
       done(null,count);
       return null;
     })
     .catch(done);
   }
 },function (err,data) {
   if(err) return res.status(500).send(err);
   res.json(data);
 });



};

exports.solcitudes = function (req, res) {

    var currentYear = new Date().getFullYear();
    var years = [];
    var data = [];

    for (var i = currentYear; i >= currentYear-2; i--) {
      years.push(i);
    }

    async.eachSeries(years,function (year, next) {
      var fecha = 'fecha_solicitud';
      var obj = {concluido:0, inactivo:0, activo:0, enproceso:0, cancelado:0, cero:0, recibidas:0};

      async.series([
       function (done) {
         getConcluidasOrCanceladas(year,fecha)
         .then(function(count){

             count.forEach(function (v) {
               if(v.asignacion) obj[v.asignacion.estatus] = v.dataValues.count;
             });

             done(null);
             return null;
         })
         .catch(done);
       },
       function(done){

         if(currentYear !== year ) return done(null);
         getCanceladosOrActivo(year,{ $gte: new Date() }).then(function (count) {
           obj.activo = count;
           done(null);
           return null;
         }).catch(done);

       },
       function(done){

         if(currentYear !== year ) return done(null);
         getCanceladosOrActivo(year,{ $lt: new Date() }).then(function (count) {
           obj.cancelado = count;
           done(null);
           return null;
         }).catch(done);

       },

       function(done) {
         getCeroIdOrAll(year,{id_asignacion:0}).then(function (count) {
           obj.cero = count;
           done(null);
           return null;
         }).catch(done);
       },

       function (done) {
        getCeroIdOrAll(year).then(function (count) {
          obj.recibidas = count;
          done(null);
          return null;
        }).catch(done);
      },

       function(done){
         if(year === currentYear){
           obj.enproceso += obj.cero + obj.inactivo;
         }else{
           obj.cancelado = obj.activo + obj.cero + obj.inactivo;
         }

         obj.year = year;
         data.push(obj);
         done(null);
       }

      ],next);

    },function(err){
      if(err) return res.status(500).send(err);
      res.json(data);
    });

  function getConcluidasOrCanceladas(year,fecha,extend) {
    return db.solicitud.findAll({
      attributes: [[sequelize.fn('count', sequelize.col('asignacion.estatus')), 'count']],
      where:sequelize.and(
        sequelize.where(sequelize.fn('YEAR', sequelize.col(fecha)), year),
        extend
    ),
      include: [
        { attributes: ['estatus'], model: db.asignacion }
      ],
      group: ['asignacion.estatus']
    });

  }

  function getCanceladosOrActivo(year,date){
    return db.solicitud.count({
      // attributes: [[sequelize.fn('count', sequelize.col('asignacion.estatus')), 'count']],
      where: sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha_solicitud')), year),
      include: [
        {
          model: db.asignacion,
          where: {
            estatus: 'activo',
            fecha_terminacion: date
          }
        }
      ]
    });

  }

  function getCeroIdOrAll(year,query){
    return db.solicitud.count({
      where: sequelize.and(
        sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha_solicitud')), year),
        query
      ),
    });
  }

};


exports.all = function (req, res) {

var query = req.query;
var year = query.year || new Date().getFullYear();

db.solicitud.findAll({
  attributes: [
        'id_entidad',
        [sequelize.fn('SUM', sequelize.col('monto_solicitud')), 'monto']
    ],
   where:sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha_solicitud')), year),
  include:[{
    model:db.asignacion,
    attributes:{ exclude:['id_asignacion', 'estatus','resolucion'] },
    where:{
      estatus:'concluido',
      resolucion: 'aprobado'
    }
  },{
    model:db.entidad,
    attributes: {include:['nombre_entidad']}
  }
],
  group: 'id_entidad',
  order: 'monto DESC'
})
.then(function (solicitudes) {
  // res.json(solicitudes);
  var result = [];
  var otros  = {monto:0,entidad:{nombre_entidad:'OTROS'}};

  solicitudes.forEach(function (item, idx) {

    if(idx >= 10){
      otros.monto += item.dataValues.monto || 0;
    }else{
      result.push(item);
    }
  });
  result.push(otros);

  res.json(result);
})
.catch(function (err) {
  res.status(500).send(err);
});

};
