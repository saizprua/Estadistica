'use strict';

var db = require('../../../../config/sequelize');
var sequelize = require('sequelize');

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
  var otros  = {monto:0,entidad:{nombre_entidad:'Otros'}};

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
