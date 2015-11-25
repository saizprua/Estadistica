'use strict';

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
      }

		},
		{
			tableName:'iti_capacitaciones',
			associate: function(models) {
        Iti.belongsTo(models.User);
			},
			hooks: {
			 beforeValidate: function (item) {
 					 if(typeof item.fecha_reporte  === 'string'){
 						 	item.fecha_reporte = new Date(item.fecha_reporte);
 					 }
 			 }
	 }
		}
	);

	return Iti;
};
