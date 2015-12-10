'use strict';

module.exports = function(sequelize, DataTypes) {

	var Usuarios = sequelize.define('usuarios',
		{
      id_personal:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        notEmpty: true
      }
		},
		{
			tableName:'usuarios'
		}
	);

	return Usuarios;
};
