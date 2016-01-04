'use strict';
/**
	* Sessions Model
	*/
module.exports = function(sequelize, DataTypes) {


	var Sessions = sequelize.define('sessions',
		{
			session_id:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                primaryKey: true
            },
             expires:{
                 type: DataTypes.INTEGER.UNSIGNED,
                 allowNull: false
             },
            data:{
                type: DataTypes.TEXT
            }
        },{
            timestamps: false
        }
	);

	return Sessions;
};
