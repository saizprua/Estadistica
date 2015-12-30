'use strict';

module.exports = function(sequelize, DataTypes) {

    var Config = sequelize.define('config',
        {

            config_item:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: true
            },
            value_item:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true
            }
        },
        {
            tableName:'config'

        }
    );

    return Config;
};
