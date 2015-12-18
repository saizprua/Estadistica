'use strict';
/**
	* Role Model
	*/


module.exports = function(sequelize, DataTypes) {

	var Role = sequelize.define('Role',
		{
			nombre: {
				type: DataTypes.STRING,
				unique: true,
				notEmpty: true
			}
		},
		{
			tableName:'role'
		}
	);

	return Role;
};
