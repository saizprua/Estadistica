'use strict';

var when = require('when');

module.exports = function(sequelize, DataTypes) {

	var Iti = sequelize.define('iti',
		{

			atendidos:{
				type: DataTypes.INTEGER,
        		allowNull: false,
        		notEmpty: true,
        		comment: 'Son las personas antendidas durantes la capacitacion'
			},
     		 egresados:{
				type: DataTypes.INTEGER,
        		allowNull: false,
        notEmpty: true,
        comment: 'Son la personas egresadas al finalizar las capacitaciones'
			},
      eventos:{
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true,
        comment: 'Numero de eventos realizados'
      },
      ip:{
        type: DataTypes.STRING(20)
      },
      fecha_reporte:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        notEmpty: true,
				unique: true,
        comment: 'Fecha en la que se generea el reporte'
      },
			user_id:{
				type: DataTypes.INTEGER,
				allowNull:false,
				notEmpty: true
			}

		},
		{
			tableName:'iti_capacitaciones',
			associate: function(models) {
        Iti.belongsTo(models.User,{
					foreignKey: 'user_id',
					onDelete: 'cascade'
				});
			},
			hooks: {
			 beforeValidate: function (item) {
				 var deferred = when.defer();

 					 if(typeof item.fecha_reporte  === 'string'){
 						 	item.fecha_reporte = new Date(item.fecha_reporte);
 					 }

					 var curdate = new Date();
 					 var nFecha = curdate.getYear() + curdate.getMonth();
 					 var rFecha = item.fecha_reporte.getYear() + item.fecha_reporte.getMonth();

					 if(item.egresados > item.atendidos){
						 console.log(item.egresados, item.atendidos);
						 setTimeout(function () {
						 		deferred.reject({message:'Egresados no puede ser mayor a atendidos.'});
						 });
					 }else if (rFecha > nFecha) {
						 console.log(rFecha, nFecha);
						 setTimeout(function () {
 							 deferred.reject({message:'El mes no puede ser mayor al actual.'});
 						});
					}else if(item.eventos > item.egresados || item.eventos >  item.atendidos){
						setTimeout(function () {
							deferred.reject({message:'Eventos debe ser menor a egresados y antedidos.'});
					 });
					}
					 else{
						 deferred.resolve();
					 }

					return deferred.promise;
 			 }
	 }
		}
	);

	return Iti;
};
