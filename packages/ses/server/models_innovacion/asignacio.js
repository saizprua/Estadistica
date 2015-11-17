'use strict';

module.exports = function(sequelize, DataTypes) {

	var asignacion = sequelize.define('asignacion',
		{
      id_asignacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        notEmpty: true
      },
			estatus:{
				type: DataTypes.STRING,
			},
			resolucion:{
				type: DataTypes.STRING(50),
			}


		},
		{
			tableName:'asignacion',
			associate: function(models) {
				asignacion.hasMany(models.solicitud,{
          foreignKey: 'id_asignacion',
          onDelete: 'cascade'
        });
			}
		}
	);

	return asignacion;
};
