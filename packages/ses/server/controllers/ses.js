'use strict';

var db = require('../../../../config/sequelize');
var sequelize = require('sequelize');

exports.all = function (req, res) {

db.solicitud.findAll({
  attributes: [
        'id_entidad',
        [sequelize.fn('SUM', sequelize.col('monto_solicitud')), 'monto']
    ],
   where:{
    fecha_solicitud:{
      $between: ['2015-01-01', '2015-12-31']
    }
  },
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
.then(function (solicitud) {
  res.json(solicitud);
})
.catch(function (err) {
  res.status(500).send(err);
});
  // db.sequelize_innovacion.query("select * from (SELECT SUM(monto_solicitud) monto, id_entidad, (SELECT nombre_entidad FROM entidad WHERE sol.id_entidad = entidad.id_entidad) nombre_entidad FROM solicitud sol LEFT JOIN asignacion asig ON sol.id_asignacion = asig.id_asignacion WHERE fecha_solicitud between '2015-01-01' and '2015-12-31' AND estatus = 'concluido' AND resolucion IN ('aprobado') GROUP BY id_entidad HAVING nombre_entidad IS NOT NULL ORDER BY monto DESC LIMIT 0,10) t1 UNION select sum(monto) monto, 999 id_entidad, 'Otras' nombre_entidad from (SELECT SUM(monto_solicitud) monto, id_entidad, (SELECT nombre_entidad FROM entidad WHERE sol.id_entidad = entidad.id_entidad) nombre_entidad FROM solicitud sol LEFT JOIN asignacion asig ON sol.id_asignacion = asig.id_asignacion WHERE fecha_solicitud between '2015-01-01' and '2015-12-31' AND estatus = 'concluido' AND resolucion IN ('aprobado') GROUP BY id_entidad HAVING nombre_entidad IS NOT NULL ORDER BY monto DESC LIMIT 10, 120) t2", { type: db.sequelize_innovacion.QueryTypes.SELECT})
  // .then(function(entidades) {
  //   res.json(entidades);
  // })
  // .catch(function (err) {
  //   res.status(500).send(err);
  // });
  //


};


exports.test = function (req, res) {
    db.asignacion.find({
      include:[
      {
        model:db.solicitud,
        attributes:{ exclude:['id_asignacion', 'estatus','resolucion'] }
      }
      ]
    })
    .then(function (asignacion) {
      res.json(asignacion);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

/*
SELECT SUM(sol.monto_solicitud) monto, sol.id_entidad
FROM solicitud sol LEFT JOIN asignacion asig ON sol.id_asignacion = asig.id_asignacion
WHERE
	fecha_solicitud between '2015-01-01' and '2015-12-31'
	AND estatus = 'concluido'
	AND resolucion = 'aprobado'
GROUP BY id_entidad  ORDER BY monto DESC;


 */
