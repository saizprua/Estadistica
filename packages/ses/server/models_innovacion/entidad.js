'use strict';

module.exports = function(sequelize, DataTypes) {

	var Entidad = sequelize.define('entidad',
		{
      id_entidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        notEmpty: true
      },
			nombre_entidad:{
				type: DataTypes.STRING,
			}
		},
		{
			tableName:'entidad',
			associate: function(models) {
				Entidad.hasMany(models.solicitud,{
          foreignKey: 'id_entidad',
          onDelete: 'cascade'
        });
			}
		}
	);

	return Entidad;
};
