'use strict';

module.exports = function(sequelize, DataTypes) {

    var Acl = sequelize.define('acl',
        {

            role:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: 'role_ruta'
            },
            ruta:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: 'role_ruta'
            },
            metodos:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true
            }

        },
        {
            tableName:'acl'

        }
    );

    return Acl;
};
